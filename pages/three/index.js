import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './Avatar';
import Header from '../../components/Header';

import GridLines from 'react-gridlines';

const style = {
    wrapper : ``,
    dataWrapper: `flex flex-row`,
    commonWrap:`flex-1 items-center`
}
export default function ThreeViewer() {
    return (
        <div className={style.wrapper}> 
            <Header />
            <div className={style.dataWrapper}>
                <div className={style.commonWrap}>
                <GridLines className="grid-area" cellWidth={60} strokeWidth={0.5} cellWidth2={60}>
                    <Canvas
                        camera={{ position: [2, 0, 12.25], fov: 15 , near:1, far:1000}}
                        style={{
                        backgroundColor: 'transparent',
                        width: '50vw',
                        height: '90vh',
                        }}
                    >
                        <ambientLight intensity={1.25} />
                        <ambientLight intensity={0.1} />
                        <directionalLight intensity={0.4} />
                        <Suspense fallback={null}>
                            <Model position={[0.025, -0.9, 0]} />
                        </Suspense>
                        <OrbitControls />
                    </Canvas>
                </GridLines>
                </div>
                <div className={style.commonWrap}>
                    <Canvas
                        camera={{ position: [2, 0, 12.25], fov: 15 , near:1, far:1000}}
                        style={{
                        backgroundColor: '#999',
                        width: '50vw',
                        height: '90vh',
                        }}
                    >
                        <ambientLight intensity={1.25} />
                        <ambientLight intensity={0.1} />
                        <directionalLight intensity={0.4} />
                        <Suspense fallback={null}>
                            <Model position={[0.025, -0.9, 0]} />
                        </Suspense>
                        <OrbitControls />
                    </Canvas>
                </div>
            </div>
        </div>
    );
}