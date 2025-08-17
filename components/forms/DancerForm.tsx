import React from 'react';
import FileUpload from '../FileUpload';

interface FormProps {
    formData: any;
    updateFormData: (data: any) => void;
}

const DancerForm: React.FC<FormProps> = ({ formData, updateFormData }) => {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold border-b pb-2">Dancer & Choreographer Details</h3>
            <div>
                <label htmlFor="dancer-bio" className="block text-sm font-medium text-gray-700">Brief Yourself</label>
                <textarea id="dancer-bio" placeholder="Describe your style, experience, and what makes you unique..." className="w-full p-2 mt-1 border rounded-md min-h-[120px]"></textarea>
            </div>
            <FileUpload label="Dance Video" onFilesUploaded={() => {}} />
            <FileUpload label="Profile Photo" onFilesUploaded={() => {}} />
        </div>
    );
};

export default DancerForm;
