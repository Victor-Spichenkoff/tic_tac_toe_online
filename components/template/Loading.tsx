import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";


export const Loading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <FontAwesomeIcon icon={faSpinner} className="text-lightCircle text-6xl animate-spin" />
        </div>
    )
}
