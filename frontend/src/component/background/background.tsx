import Balatro from '../animation/balatro_background.tsx';

function Background() {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <Balatro
                isRotate={false}
                mouseInteraction={true}
                pixelFilter={700}
            />
        </div>
    )
}

export default Background;