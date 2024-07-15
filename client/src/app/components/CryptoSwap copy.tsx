import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { message, Modal } from 'antd';
import { HiArrowsUpDown } from "react-icons/hi2";
import { FaAngleDown } from 'react-icons/fa';
import data from '../data/cryptos.json'; // Adjust the import path as needed
import SearchCrypto from './SearchCrypto';

const CryptoSwap = () => {
    const [isOpenFristToken, setIsOpenFristToken] = useState(false);
    const [isOpenSecondToken, setIsOpenSecondToken] = useState(false);
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);

    const searchParams = useSearchParams();
    const firstTokenParam = searchParams.get('firstToken');
    const secondTokenParam = searchParams.get('secondToken');

    const [firstToken, setFirstToken] = useState(() => {
        const storedTokenName = firstTokenParam || '';
        const storedToken = data.find(item => item.token.includes(storedTokenName));
        return storedToken || { token: 'ETH', icon: './cryptos/eth.svg', price: 70 };
    });

    const [secondToken, setSecondToken] = useState(() => {
        const storedTokenName = secondTokenParam || '';
        if (storedTokenName === '') return { token: 'Select a token', icon: './cryptos/btg.svg', price: 0 };
        const storedToken = data.find(item => item.token.includes(storedTokenName));
        return storedToken || { token: 'Select a token', icon: './cryptos/btg.svg', price: 0 };
    });

    const [fistValue, setFistValue] = useState(0);
    const [secondValue, setSecondValue] = useState(0);

    const [messageApi, contextHolder] = message.useMessage();

    const firstTokenRef = useRef<HTMLInputElement>(null);
    const secondTokenRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (firstTokenParam && secondTokenParam) {
            const newFirstToken = data.find(item => item.token.includes(firstTokenParam));
            setFirstToken(newFirstToken || firstToken);
            const newSecondToken = data.find(item => item.token.includes(secondTokenParam));
            setSecondToken(newSecondToken || secondToken);
        }
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
        setIsOpenFristToken(false);
        setIsOpenSecondToken(false);
    };

    const setFToken = (token: string, icon: string, price: number) => {
        setFirstToken({ token: token, icon: icon, price: price });
        setFistValue(Number((secondValue * secondToken.price / price).toFixed(5)));
        onClose();
    };

    const setSToken = (token: string, icon: string, price: number) => {
        setSecondToken({ token: token, icon: icon, price: price });
        setSecondValue(Number((fistValue * firstToken.price / price).toFixed(5)));
        onClose();
    };

    const onChangeFirstToken = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFistValue(Number(e.target.value));
        setSecondValue(Number((Number(e.target.value) * firstToken.price / secondToken.price).toFixed(5)));
    };

    const onChangeSecondToken = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSecondValue(Number(e.target.value));
        setFistValue(Number((Number(e.target.value) * secondToken.price / firstToken.price).toFixed(5)));
    };

    const success = () => {
        setIsOpenConfirm(false);
        messageApi.open({
            type: 'success',
            content: 'Swap success!!!',
        });
    };

    const changeToken = () => {
        setFirstToken(secondToken);
        setFistValue(secondValue);
        setSecondToken(firstToken);
        setSecondValue(fistValue);
    };

    return (
        <div className="w-[360px] p-1 rounded-lg border border-blue-300 mx-auto mt-[50px] dark:bg-gray-800 dark:border-gray-600">
            {isOpenFristToken && (
                <SearchCrypto
                    key={1}
                    open={isOpenFristToken}
                    onClose={onClose}
                    setToken={(token, icon, price) => setFToken(token, icon, price)}
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
                        value={fistValue.toString()}
                    />

                    <div
                        className="flex p-2 rounded-full bg-white font-medium text-[20px] hover: cursor-pointer hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        onClick={() => setIsOpenFristToken(true)}>
                        <img src={firstToken.icon} alt={firstToken.token} />
                        <span className="ml-2">{firstToken.token}</span>
                        <FaAngleDown className="mt-2 ml-1" />
                    </div>
                </div>
                <span className="ml-3 text-gray-400 dark:text-gray-300">
                    {fistValue != 0 && firstToken.price != 0 && `$${fistValue * firstToken.price}`}
                </span>
            </div>
            <div 
                className="absolute transform  ml-[160px] -mt-5 bg-white rounded-md dark:bg-gray-700"
                onClick={changeToken}>
                <div className="hover: cursor-pointer m-1 p-2 bg-gray-100 z-[999] rounded-md hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 text-[20px]">
                    <HiArrowsUpDown />
                </div>
            </div>

            {isOpenSecondToken && (
                <SearchCrypto
                    key={2}
                    open={isOpenSecondToken}
                    onClose={onClose}
                    setToken={(token, icon, price) => setSToken(token, icon, price)}
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
                    />

                    <div
                        className="flex p-2 rounded-full bg-white font-medium text-[20px] hover: cursor-pointer hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                        onClick={() => setIsOpenSecondToken(true)}>
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
                onClick={() => setIsOpenConfirm(true)}
            >
                Swap
            </button>

            <Modal
                title="Confirm"
                open={isOpenConfirm}
                onOk={success}
                onCancel={() => setIsOpenConfirm(false)}
                okText="Yes"
                cancelText="No"
            >
                <p>Are you really swap?</p>
            </Modal>
        </div>
    );
};

export default CryptoSwap;
