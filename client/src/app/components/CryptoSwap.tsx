import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { message, Modal, Spin } from 'antd';
import { HiArrowsUpDown } from "react-icons/hi2";
import { FaAngleDown } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const SearchCrypto = dynamic(() => import('./SearchCrypto'), { suspense: true });

const CryptoSwap = () => {
    const [isOpenFirstToken, setIsOpenFirstToken] = useState(false);
    const [isOpenSecondToken, setIsOpenSecondToken] = useState(false);
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);

    const searchParams = useSearchParams();
    const firstTokenParam = searchParams.get('firstToken');
    const secondTokenParam = searchParams.get('secondToken');

    const [data, setData] = useState([]);
    const [firstToken, setFirstToken] = useState({ token: 'ETH', icon: './cryptos/eth.svg', price: 70 });
    const [secondToken, setSecondToken] = useState({ token: 'BTG', icon: './cryptos/btg.svg', price: 0 });
    const [firstValue, setFirstValue] = useState(0);
    const [secondValue, setSecondValue] = useState(0);

    const [messageApi, contextHolder] = message.useMessage();
    const firstTokenRef = useRef<HTMLInputElement>(null);
    const secondTokenRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/cryptos');
                const result = await response.json();
                setData(result);
                setLoading(false);

                if (firstTokenParam) {
                    const storedToken = result.find(item => item.token.includes(firstTokenParam));
                    setFirstToken(storedToken || { token: 'ETH', icon: './cryptos/eth.svg', price: 70 });
                }

                if (secondTokenParam) {
                    const storedToken = result.find(item => item.token.includes(secondTokenParam));
                    setSecondToken(storedToken || { token: 'BTG', icon: './cryptos/btg.svg', price: 0 });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [firstTokenParam, secondTokenParam]);

    useEffect(() => {
        updateUrlParams();

        if (firstToken.token === 'Select a token') firstTokenRef.current?.setAttribute('disabled', 'true');
        else firstTokenRef.current?.removeAttribute('disabled');
        if (secondToken.token === 'Select a token') secondTokenRef.current?.setAttribute('disabled', 'true');
        else secondTokenRef.current?.removeAttribute('disabled');
    }, [firstToken, secondToken]);

    const updateUrlParams = () => {
        const urlParams = new URLSearchParams(window.location.search);
        if (firstToken.token !== 'Select a token') urlParams.set('firstToken', firstToken.token);
        if (secondToken.token !== 'Select a token') urlParams.set('secondToken', secondToken.token);
        window.history.replaceState({}, '', `?${urlParams.toString()}`);
    };

    const onClose = () => {
        setIsOpenFirstToken(false);
        setIsOpenSecondToken(false);
    };

    const setFToken = (token, icon, price) => {
        setFirstToken({ token, icon, price });
        setFirstValue(Number((secondValue * secondToken.price / price).toFixed(5)));
        onClose();
    };

    const setSToken = (token, icon, price) => {
        setSecondToken({ token, icon, price });
        setSecondValue(Number((firstValue * firstToken.price / price).toFixed(5)));
        onClose();
    };

    const onChangeFirstToken = (e) => {
        setFirstValue(Number(e.target.value));
        setSecondValue(Number((Number(e.target.value) * firstToken.price / secondToken.price).toFixed(5)));
    };

    const onChangeSecondToken = (e) => {
        setSecondValue(Number(e.target.value));
        setFirstValue(Number((Number(e.target.value) * secondToken.price / firstToken.price).toFixed(5)));
    };

    const getPrice = async () => {
        try {
            const response = await fetch(`/api/swap?action=getPrice&fromToken=${firstToken.token}&toToken=${secondToken.token}&amount=${firstValue}`);
            const data = await response.json();
            // Show indicative price in modal
            Modal.info({
                title: 'Indicative Price',
                content: `Price: ${data.price}`
            });
        } catch (error) {
            console.error('Error fetching price:', error);
            messageApi.error('Failed to fetch price');
        }
    };

    const getQuote = async () => {
        try {
            const response = await fetch(`/api/swap?action=getQuote&fromToken=${firstToken.token}&toToken=${secondToken.token}&amount=${firstValue}`);
            const data = await response.json();
            // Show quote in modal
            Modal.confirm({
                title: 'Swap Quote',
                content: (
                    <div>
                        <p>Price: {data.price}</p>
                        <p>Gas Estimate: {data.gas}</p>
                    </div>
                ),
                onOk: () => confirmSwap(data)
            });
        } catch (error) {
            console.error('Error fetching quote:', error);
            messageApi.error('Failed to fetch quote');
        }
    };

    const confirmSwap = async (quoteData) => {
        try {
            // Perform additional actions as needed for swap confirmation
            console.log('Swap confirmed:', quoteData);
            // For now, just display success message
            success();
        } catch (error) {
            console.error('Error confirming swap:', error);
            messageApi.error('Failed to confirm swap');
        }
    };

    const success = () => {
        setIsOpenConfirm(false);
        messageApi.open({
            type: 'success',
            content: 'Swap success!!!',
        });
    };

    const changeToken = () => {
        const tempFirstToken = { ...firstToken };
        const tempFirstValue = firstValue;
        
        setFirstToken(secondToken);
        setFirstValue(secondValue);
        setSecondToken(tempFirstToken);
        setSecondValue(tempFirstValue);
    };

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <div className="w-[360px] p-1 rounded-lg border border-blue-300 mx-auto mt-[50px] dark:bg-gray-800 dark:border-gray-600">
                {isOpenFirstToken && (
                    <SearchCrypto
                        key={1}
                        open={isOpenFirstToken}
                        onClose={onClose}
                        setToken={setFToken}
                    />
                )}
                <div className="w-full p-2 bg-gray-100 rounded-lg mb-2 dark:bg-gray-700">
                    <span className="text-gray-400 left-2 dark:text-gray-300"> You pay </span>
                    <div className="flex justify-between mt-2 mx-2">
                        <input
                            placeholder='0'
                            size={5}
                            ref={firstTokenRef}
                            type="number"
                            className="w-[150px] text-[20px] bg-transparent focus:outline-none dark:text-white"
                            style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }} 
                            onChange={onChangeFirstToken}
                            value={firstValue.toString()}
                            disabled={loading}
                        />
                        <div
                            className="flex p-2 rounded-full bg-white font-medium text-[20px] hover: cursor-pointer hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                            onClick={() => setIsOpenFirstToken(true)}
                        >
                            <img src={firstToken.icon} alt={firstToken.token} />
                            <span className="ml-2">{firstToken.token}</span>
                            <FaAngleDown className="mt-2 ml-1" />
                        </div>
                    </div>
                    <span className="ml-3 text-gray-400 dark:text-gray-300">
                        {firstValue != 0 && firstToken.price != 0 && `$${firstValue * firstToken.price}`}
                    </span>
                </div>
                <div 
                    className="absolute transform ml-[160px] -mt-5 bg-white rounded-md dark:bg-gray-700"
                    onClick={changeToken}
                >
                    <div className="hover: cursor-pointer m-1 p-2 bg-gray-100 z-[999] rounded-md hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 text-[20px]">
                        <HiArrowsUpDown />
                    </div>
                </div>

                {isOpenSecondToken && (
                    <SearchCrypto
                        key={2}
                        open={isOpenSecondToken}
                        onClose={onClose}
                        setToken={setSToken}
                    />
                )}

                <div className="w-full p-2 bg-gray-100 rounded-lg dark:bg-gray-700">
                    <span className="text-gray-400 left-2 dark:text-gray-300"> You receive </span>
                    <div className="flex justify-between mt-2 mx-2">
                        <input
                            placeholder='0'
                            size={15}
                            ref={secondTokenRef}
                            type="number"
                            className="w-[150px] text-[20px] bg-transparent focus:outline-none dark:text-white"
                            onChange={onChangeSecondToken}
                            value={secondValue.toString()}
                            disabled={loading}
                        />
                        <div
                            className="flex p-2 rounded-full bg-white font-medium text-[20px] hover: cursor-pointer hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                            onClick={() => setIsOpenSecondToken(true)}
                        >
                            <img src={secondToken.icon} alt={secondToken.token} />
                            <span className="ml-2">{secondToken.token}</span>
                            <FaAngleDown className="mt-2 ml-1" />
                        </div>
                    </div>
                    <span className="ml-3 text-gray-400 dark:text-gray-300">
                        {secondValue != 0 && secondToken.price != 0 && `$${secondValue * secondToken.price}`}
                    </span>
                </div>
                {contextHolder}
                <button
                    className="w-full h-[40px] bg-pink-100 text-center items-center mt-2 rounded-lg font-medium text-[18px] text-pink-600 hover:bg-pink-200 dark:bg-pink-600 dark:text-white dark:hover:bg-pink-500"
                    onClick={getPrice}
                    disabled={loading}
                >
                    Get Price
                </button>
                <button
                    className="w-full h-[40px] bg-pink-100 text-center items-center mt-2 rounded-lg font-medium text-[18px] text-pink-600 hover:bg-pink-200 dark:bg-pink-600 dark:text-white dark:hover:bg-pink-500"
                    onClick={getQuote}
                    disabled={loading}
                >
                    Swap
                </button>
                <Modal
                    title="Confirm Swap"
                    visible={isOpenConfirm}
                    onOk={() => setIsOpenConfirm(false)}
                    onCancel={() => setIsOpenConfirm(false)}
                    okText="Confirm"
                    cancelText="Cancel"
                >
                    <p>Are you sure you want to swap?</p>
                </Modal>
            </div>
        </React.Suspense>
    );
};

export default CryptoSwap;
