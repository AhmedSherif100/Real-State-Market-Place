import { useDispatch } from 'react-redux';
import { CONFIRMATION_MODAL_CLOSE_TYPES } from '../../../../utils/globalConstantUtil';
import { deleteLead } from '../../leads/leadSlice';
import { showNotification } from '../headerSlice';

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Renders a confirmation modal with a custom message and actions.
 * 
 * @param {object} extraObject - Contains additional details for the modal.
 * @param {function} closeModal - Function to close the modal.
 *
 * The modal displays a message and two buttons: "Cancel" and "Yes".
 * The "Yes" button triggers an action based on the type provided in the extraObject.
 * Specifically, if the type is CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE, it dispatches
 * a deleteLead action and shows a notification of successful deletion.
 */

/*******  796d6b23-3951-4e03-b47f-96fcca801a8f  *******/function ConfirmationModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();

  const { message, type, _id, index } = extraObject;

  const proceedWithYes = async () => {
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.LEAD_DELETE) {
      // positive response, call api or dispatch redux function
      dispatch(deleteLead({ index }));
      dispatch(showNotification({ message: 'Lead Deleted!', status: 1 }));
    }
    closeModal();
  };

  return (
    <>
      <p className=" text-xl mt-8 text-center">{message}</p>

      <div className="modal-action mt-12">
        <button className="btn btn-outline   " onClick={() => closeModal()}>
          Cancel
        </button>

        <button
          className="btn btn-primary w-36"
          onClick={() => proceedWithYes()}
        >
          Yes
        </button>
      </div>
    </>
  );
}

export default ConfirmationModalBody;
