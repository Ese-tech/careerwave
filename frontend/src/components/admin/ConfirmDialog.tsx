// frontend/src/components/admin/ConfirmDialog.tsx


interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    isDanger?: boolean;
}

/**
 * Wiederverwendbarer Modaldialog zur Bestätigung kritischer Aktionen.
 * @param open Steuert die Sichtbarkeit des Modals.
 * @param title Der Titel des Dialogs.
 * @param message Die Hauptnachricht, die angezeigt wird.
 * @param onConfirm Callback für die Bestätigungsaktion.
 * @param onCancel Callback für die Abbruchaktion.
 * @param isDanger Wenn true, wird der Bestätigungsbutton rot.
 */
function ConfirmDialog({ 
    open, 
    title, 
    message,
    confirmText = 'Bestätigen',
    cancelText = 'Abbrechen',
    onConfirm, 
    onCancel,
    isDanger = true // Standardmäßig als gefährlich angesehen
}: ConfirmDialogProps) {

    if (!open) return null;

    const confirmButtonClasses = isDanger
        ? "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md"
        : "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md";

    return (
        // Overlay
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-[9999]">
            
            {/* Modal Box */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-sm transform transition-all">
                
                {/* Header */}
                <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{title}</h2>
                
                {/* Content */}
                <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
                
                {/* Buttons */}
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className={confirmButtonClasses}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDialog;