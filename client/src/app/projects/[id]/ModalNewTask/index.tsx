import Modal from "@/app/(components)/Modal";
import { Priority, Status, useCreateTaskMutation } from "@/state/api";
import React from "react";
import { formatISO } from "date-fns";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id?: string | null;
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  authorUserId: Yup.string().required("Author User ID is required"),
});

const ModalNewTask = ({ isOpen, onClose, id = null }: Props) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      const formattedStartDate = values.startDate
        ? formatISO(new Date(values.startDate), { representation: "complete" })
        : "";

      const formattedDueDate = values.dueDate
        ? formatISO(new Date(values.dueDate), { representation: "complete" })
        : "";

      if (id === null) {
        toast.error("Project ID is missing. Cannot create task.");
        return;
      }

      await createTask({
        title: values.title,
        description: values.description,
        status: values.status,
        priority: values.priority,
        tags: values.tags,
        startDate: formattedStartDate,
        dueDate: formattedDueDate,
        authorUserId: parseInt(values.authorUserId),
        assignedUserId: values.assignedUserId ? parseInt(values.assignedUserId) : undefined,
        projectId: Number(id),
      }).unwrap();
      
      toast.success("Task created successfully");
      resetForm();
      onClose();
    } catch (error: any) {
      toast.error(
        error.message || "Failed to create task. Please try again."
      );
    }
  };

  const initialValues = {
    title: "",
    description: "",
    status: Status.ToDo,
    priority: Priority.Backlog,
    tags: "",
    startDate: "",
    dueDate: "",
    authorUserId: "",
    assignedUserId: "",
  };

  const selectStyles =
    "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, dirty }) => (
          <Form className="mt-4 space-y-6">
            <div>
              <Field
                type="text"
                name="title"
                className={inputStyles}
                placeholder="Title"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <Field
              as="textarea"
              name="description"
              className={inputStyles}
              placeholder="Description"
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
              <Field
                as="select"
                name="status"
                className={selectStyles}
              >
                <option value="">Select Status</option>
                <option value={Status.ToDo}>To Do</option>
                <option value={Status.WorkInProgress}>Work In Progress</option>
                <option value={Status.UnderReview}>Under Review</option>
                <option value={Status.Completed}>Completed</option>
              </Field>

              <Field
                as="select"
                name="priority"
                className={selectStyles}
              >
                <option value="">Select Priority</option>
                <option value={Priority.Urgent}>Urgent</option>
                <option value={Priority.High}>High</option>
                <option value={Priority.Medium}>Medium</option>
                <option value={Priority.Low}>Low</option>
                <option value={Priority.Backlog}>Backlog</option>
              </Field>
            </div>

            <Field
              type="text"
              name="tags"
              className={inputStyles}
              placeholder="Tags (comma separated)"
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
              <Field
                type="date"
                name="startDate"
                className={inputStyles}
              />
              <Field
                type="date"
                name="dueDate"
                className={inputStyles}
              />
            </div>

            <div>
              <Field
                type="text"
                name="authorUserId"
                className={inputStyles}
                placeholder="Author User ID"
              />
              <ErrorMessage name="authorUserId" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <Field
              type="text"
              name="assignedUserId"
              className={inputStyles}
              placeholder="Assigned User ID"
            />

            <button
              type="submit"
              className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${!isValid || !dirty || isLoading ? "cursor-not-allowed opacity-50" : ""
                }`}
              disabled={!isValid || !dirty || isLoading}
            >
              {isLoading ? "Creating..." : "Create Task"}
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ModalNewTask;