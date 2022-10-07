import React, { useState, useEffect} from "react";

const itemTmpList = require('./data.json')
function Collections() {    
    const [itemList, setItem] = useState([]);

    useEffect(() => {
        setItem(itemTmpList.data.collections.edges)    
    }, []);

    return (
        <div className="secondComponent5">
            <div className="secondComponentInside">
                <p className="firstContent5">Top collections over <span className="firstContentBlue">last 30 days</span></p>
                <div className="contentWrap">
                {
                    itemList.map((item) => (
                        <span className="itemWrap2222" key={item.node.id}>
                            <img
                                className="logoimage"
                                src={item.node.logo}
                            />
                            <div className="itemTextWrap2">
                                <p className="itemText2">{item.node.name}</p>
                                <p className="itemText3">
                                    <img
                                        className="iconimage"
                                        src={item.node.nativePaymentAsset.asset.imageUrl}
                                    />
                                    Floor Price : {item.node.statsV2.floorPrice?.unit}
                                    
                                </p>
                            </div>
                            <div className="itemTextWrap3">
                                <p className="itemText2">{item.node.statsV2.thirtyDayChange.toFixed(2)}</p>
                                <p className="itemText3">
                                    <img
                                        className="iconimage"
                                        src={item.node.nativePaymentAsset.asset.imageUrl}
                                    />
                                    {item.node.statsV2.thirtyDayVolume?.unit}
                                    
                                </p>
                            </div>
                            
                        </span>
                    )
                    )}
                </div>
                
            </div>
        </div>
    );
}

export default Collections;
