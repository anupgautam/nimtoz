// src/components/Lama/BookingStatusModal.tsx
import prisma from '@/lib/db';
import React from 'react';

interface BookingStatusModalProps {
    show: boolean;
    onClose: () => void;
    bookingId: number;
    onUpdate: () => void; // Callback function to refresh the data
}

const BookingStatusModal: React.FC<BookingStatusModalProps> = ({ show, onClose, bookingId, onUpdate }) => {
    const handleAccept = async () => {
        try {
            await prisma.event.update({
                where: { id: bookingId },
                data: { is_approved: true, is_rejected: false },
            });
            onUpdate(); // Call the update function to refresh the data
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };

    const handleReject = async () => {
        try {
            await prisma.event.update({
                where: { id: bookingId },
                data: { is_approved: false, is_rejected: true },
            });
            onUpdate(); // Call the update function to refresh the data
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };

    if (!show) return null; // Don't render the modal if it's not shown

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-lg font-bold mb-4">Update Booking Status</h2>
                <p>Do you want to accept or reject this booking?</p>
                <div className="flex justify-end mt-4">
                    <button
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                        onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                        onClick={handleAccept}>
                        Accept
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={handleReject}>
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingStatusModal;
