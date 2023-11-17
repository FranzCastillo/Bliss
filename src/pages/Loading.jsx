import LoadingIcon from "../../assets/icons/LoadingIcon";

/**
 * Loading Page
 * @module LoadingPage
 * @returns {JSX}
 */
const LoadingPage = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <LoadingIcon/>
        </div>
    );
}

export default LoadingPage;