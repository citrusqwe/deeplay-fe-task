import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { v4 as uuid } from 'uuid';
import { Worker, Head } from '../types';
import workersAPI from '../api';
import * as Yup from 'yup';
import { AppContext } from '../App';
import Skeleton from 'react-loading-skeleton';
import MultiInputs from './MultiInputs';

const Schema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Your name is to short')
    .max(50, 'Your name is to long')
    .required('Required'),
  birth: Yup.date().required('Required'),
  gender: Yup.string().required('Required'),
  role: Yup.string().required('Required'),
});

interface WorkerFormProps {
  closeModal: () => void;
}

const WorkerForm: React.FC<WorkerFormProps> = ({ closeModal }) => {
  const {
    workers: [workers, setWorkers],
  } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [heads, setHeads] = useState<Head[] | null>(null);
  const [currentWorker, setCurrentWorker] = useState<Worker>({
    id: '',
    name: '',
    birth: '',
    gender: 'men',
    role: 'worker',
    company: '',
    division: '',
    head: '',
  });

  const formik = useFormik({
    initialValues: currentWorker,
    validationSchema: Schema,
    onSubmit: (values, { setSubmitting }) =>
      handleSubmitForm(values, setSubmitting),
  });

  const handleSubmitForm = (
    values: Worker,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    if (!isEdit) {
      const data = { ...values, id: uuid() };
      createWorker(data);
      if (values.role === 'department-head')
        createHead({ id: data.id, name: values.name });
      setSubmitting(false);
    } else {
      const data = { ...values, id: currentWorker.id };
      editWorker(data);
      setSubmitting(false);
    }
  };

  const createWorker = async (values: Worker) => {
    const workerData = await workersAPI().createWorker(values);
    setWorkers([...(workers as Worker[]), workerData]);
    closeModal();
  };

  const createHead = async (values: Head) => {
    await workersAPI().createHead(values);
  };

  const getCurrentWorker = async (id: string) => {
    setFormLoading(true);
    const workerData = await workersAPI().getCurrentWorker(id);
    setCurrentWorker(workerData);
    setFormLoading(false);
  };

  const getHeads = async () => {
    const heads = await workersAPI().getHeads();
    setHeads(heads);
  };

  const editWorker = async (values: Worker) => {
    const workerData = await workersAPI().editWorker(values);
    const filteredWorkers =
      workers?.map((w) => (w.id === workerData.id ? workerData : w)) || null;
    setWorkers(filteredWorkers);
    closeModal();
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    getHeads();
    if (id) {
      setIsEdit(true);
      getCurrentWorker(id);
    }
  }, []);

  useEffect(() => {
    Object.entries(currentWorker).forEach(([key, value]) => {
      if (key !== 'head') formik.setFieldValue(key, value);
    });
  }, [currentWorker]);

  if (formLoading)
    return (
      <Skeleton
        containerClassName="max-w-4xl w-full"
        className="w-full h-11 mb-4"
        inline
        count={5}
      />
    );

  return (
    <form
      className="flex flex-col animate-fadein"
      onSubmit={formik.handleSubmit}
    >
      <label htmlFor="name" className="mb-4">
        <input
          name="name"
          type="text"
          placeholder="Enter full name"
          value={formik.values.name}
          onChange={formik.handleChange}
          className="w-full border border-black rounded-md p-2"
        />
        {formik.errors.name && formik.touched.name ? (
          <div className="text-red-500">{formik.errors.name}</div>
        ) : null}
      </label>
      <label htmlFor="birth" className="mb-4">
        <input
          name="birth"
          type="date"
          value={formik.values.birth}
          onChange={formik.handleChange}
          className="w-full border border-black rounded-md p-2"
        />
        {formik.errors.birth && formik.touched.birth ? (
          <div className="text-red-500">{formik.errors.birth}</div>
        ) : null}
      </label>
      <label htmlFor="gender" className="mb-4">
        <select
          className="w-full border border-black rounded-md p-2"
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>
        {formik.errors.gender && formik.touched.gender ? (
          <div className="text-red-500">{formik.errors.gender}</div>
        ) : null}
      </label>
      <label htmlFor="role" className="mb-4">
        <select
          className="w-full border border-black rounded-md p-2"
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
        >
          <option value="worker">Worker</option>
          <option value="director">Director</option>
          <option value="department-head">Department Head</option>
          <option value="controller">Controller</option>
        </select>
        {formik.errors.role && formik.touched.role ? (
          <div className="text-red-500">{formik.errors.role}</div>
        ) : null}
      </label>
      <MultiInputs
        values={formik.values}
        handleChange={formik.handleChange}
        heads={heads}
      />
      <button
        className="p-2 px-4 bg-slate-300 rounded-md transition hover:brightness-95"
        type="submit"
        disabled={formik.isSubmitting}
      >
        {isEdit ? 'Edit worker' : 'Create worker'}
      </button>
    </form>
  );
};

export default WorkerForm;
