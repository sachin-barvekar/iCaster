import React, { useRef, useState } from 'react';
import FileUpload from '../FileUpload';
import Icon from '../Icon';

interface FormProps {
    formData: any;
    updateFormData: (data: any) => void;
}

const CommonFields: React.FC<FormProps> = ({ formData, updateFormData }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [stream, setStream] = useState<MediaStream | null>(null);

    const handleFaceVerification = async () => {
        if (!isCameraOn) {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
                setIsCameraOn(true);
            } catch (err) {
                console.error("Error accessing camera: ", err);
                alert("Could not access camera. Please ensure permissions are granted in your browser settings.");
            }
        } else {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
            setIsCameraOn(false);
            setStream(null);
        }
    };
    
    return (
        <div className="space-y-8 mt-10 pt-8 border-t">
            <div>
                <h3 className="text-xl font-bold border-b pb-2 mb-6">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" placeholder="Full Name" className="p-2 border rounded-md w-full" />
                    <select className="p-2 border rounded-md w-full bg-white"><option>Gender</option><option>Male</option><option>Female</option><option>Other</option></select>
                    <input type="text" placeholder="City" className="p-2 border rounded-md w-full" />
                    <input type="text" placeholder="Languages Known (comma-separated)" className="p-2 border rounded-md w-full" />
                    <input type="email" placeholder="Email Address" className="p-2 border rounded-md w-full" />
                    <input type="tel" placeholder="Phone Number" className="p-2 border rounded-md w-full" />
                    <textarea placeholder="Short Bio (500 characters max)" maxLength={500} className="w-full p-2 border rounded-md md:col-span-2 min-h-[100px]"></textarea>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold border-b pb-2 mb-6">Verification & Legal</h3>
                <div className="space-y-6">
                    <FileUpload label="Upload ID Proof (Aadhar/PAN/Voter ID)" onFilesUploaded={() => {}} />
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Face Verification</label>
                        <div className="flex items-center gap-4 p-4 border rounded-lg">
                            <div className="w-40 h-32 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
                                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover"></video>
                                {!isCameraOn && <Icon name="CameraOff" size={32} className="text-gray-400"/>}
                            </div>
                            <button onClick={handleFaceVerification} type="button" className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 font-semibold">
                                <Icon name="Camera" size={18} />
                                {isCameraOn ? 'Stop Camera' : 'Start Camera'}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <input id="consent" type="checkbox" className="h-4 w-4 text-purple-600 border-gray-300 rounded mt-1 focus:ring-purple-500" />
                        <label htmlFor="consent" className="ml-3 block text-sm text-gray-900">
                            I consent to the terms and conditions and allow ICASTAR to use my information for verification purposes.
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommonFields;
