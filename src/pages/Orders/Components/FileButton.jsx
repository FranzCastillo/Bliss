import Button from "@mui/material/Button";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import * as React from "react";
import createFile from "../PDF/PDFGenerator";

/**
 * Component that allows a specified order id to generate a PDF file with the order details.
 * @param id
 * @returns {Element}
 * @constructor
 */
const FileButton = ({id}) => {
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
                createFile({id});
            }}
        >

            <FileDownloadIcon className={'icon'}/>
        </Button>
    );
}

export default FileButton;