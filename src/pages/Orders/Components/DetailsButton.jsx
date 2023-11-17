import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import * as React from "react";

/**
 * Components that navigates to the details page of a specified order id.
 * @param id The id of the order to navigate to.
 * @returns {Element}
 * @constructor
 */
const DetailsButton = ({id}) => {
    const navigate = useNavigate();

    return (
        <Button
            component="button"
            variant="contained"
            size="small"
            style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                width: 100,
                justifyItems: 'center',
                alignItems: 'center',
                backgroundColor: '#201b40',
            }}
            onKeyDown={(event) => {
                if (event.key === ' ') {
                    event.stopPropagation();
                }
            }}
            onClick={() => {
                navigate(`/detalles-orden/${id}`);
            }}
        >

            <OpenInNewIcon className={'icon'}/>
        </Button>
    );
}

export default DetailsButton;