import React from 'react';
import FileUpload from '../FileUpload';

interface FormProps {
    formData: any;
    updateFormData: (data: any) => void;
}

const ActorForm: React.FC<FormProps> = ({ formData, updateFormData }) => {
    // This is a simplified version of the detailed form.
    // A full implementation would use state and onChange handlers.
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-bold border-b pb-2">Actor / Actress / Model Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-sm font-medium text-gray-700">Actor Type</label>
                    <div className="flex gap-4 mt-1 p-2 bg-gray-100 rounded-lg">
                        <label className="flex-1 text-center p-2 rounded-md cursor-pointer has-[:checked]:bg-purple-600 has-[:checked]:text-white transition-colors"><input type="radio" name="actorType" value="skilled" className="sr-only" defaultChecked/> Skilled Actor</label>
                        <label className="flex-1 text-center p-2 rounded-md cursor-pointer has-[:checked]:bg-purple-600 has-[:checked]:text-white transition-colors"><input type="radio" name="actorType" value="known" className="sr-only"/> Known Actor</label>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <input type="number" placeholder="Age" className="p-2 border rounded-md" />
                <input type="text" placeholder="Height (e.g., 5'10&quot;)" className="p-2 border rounded-md" />
                <input type="text" placeholder="Weight (kg)" className="p-2 border rounded-md" />
            </div>

            <FileUpload 
                label="Profile Images (Front, Left, Right)" 
                note="No filters, no cap/headphones." 
                multiple 
                onFilesUploaded={() => {}} 
            />
            <FileUpload 
                label="Audition Video" 
                onFilesUploaded={() => {}} 
            />

             <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-lg">
                <h4 className="font-bold text-purple-800">Promote ICASTAR & get a free manager subscription!</h4>
                <p className="text-sm text-purple-700">Share your referral link after onboarding to unlock premium benefits.</p>
            </div>
        </div>
    );
};

export default ActorForm;
