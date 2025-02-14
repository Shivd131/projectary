import Modal from '@/app/(components)/Modal';
import { useCreateProjectMutation } from '@/state/api'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { formatISO } from 'date-fns';
import React from 'react'
import * as Yup from "yup";
import toast from 'react-hot-toast';

interface ModalNewProjectProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormValues {
    projectName: string;
    description: string;
    startDate: string;
    endDate: string;
}

const validationSchema = Yup.object({
    projectName: Yup.string().required("Project Name is required"),
    description: Yup.string().required("Description is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
        .required("End date is required")
        .min(Yup.ref('startDate'), "End date can't be before start date"),
});

const ModalNewProject = ({ isOpen, onClose }: ModalNewProjectProps) => {
    const [createProject, { isLoading }] = useCreateProjectMutation();

    const initialValues: FormValues = {
        projectName: "",
        description: "",
        startDate: "",
        endDate: "",
    };

    const onSubmit = async (values: FormValues, { resetForm }: any) => {
        try {
            const formattedStartDate = formatISO(new Date(values.startDate), {
                representation: "complete",
            });
            const formattedEndDate = formatISO(new Date(values.endDate), {
                representation: "complete",
            });

            await createProject({
                name: values.projectName,
                description: values.description,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
            }).unwrap();

            toast.success("Project created successfully");
            resetForm();
            onClose();
        } catch (error: any) {
            toast.error(
                error.data?.message ||
                "Failed to create project. Please try again."
            );
        }
    };

    const inputStyles =
        "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

    return (
        <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ isValid, dirty }) => (
                    <Form className="mt-4 space-y-6">
                        <div>
                            <Field
                                type="text"
                                name="projectName"
                                placeholder="Project Name"
                                className={inputStyles}
                            />
                            <ErrorMessage
                                name="projectName"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        <div>
                            <Field
                                as="textarea"
                                name="description"
                                placeholder="Description"
                                className={inputStyles}
                            />
                            <ErrorMessage
                                name="description"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
                            <div>
                                <Field
                                    type="date"
                                    name="startDate"
                                    className={inputStyles}
                                />
                                <ErrorMessage
                                    name="startDate"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>
                            <div>
                                <Field
                                    type="date"
                                    name="endDate"
                                    className={inputStyles}
                                />
                                <ErrorMessage
                                    name="endDate"
                                    component="div"
                                    className="text-red-500 text-sm mt-1"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${(!isValid || !dirty || isLoading)
                                    ? "cursor-not-allowed opacity-50"
                                    : ""
                                }`}
                            disabled={!isValid || !dirty || isLoading}
                        >
                            {isLoading ? "Creating..." : "Create Project"}
                        </button>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}

export default ModalNewProject;