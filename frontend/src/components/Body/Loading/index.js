import './RotatingLines.css';
import { RotatingLines } from "react-loader-spinner";

const Loading = () => {
    return (
        <div className="loading-center">     
            <RotatingLines
                strokeColor="#F69322"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        </div>
    );
};

export default Loading;