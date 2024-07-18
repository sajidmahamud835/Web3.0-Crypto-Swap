import * as React from 'react';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Modal, Input, Spin } from 'antd';

const CryptoItem = dynamic(() => import('./CryptoItem'));
const PinCryptoItem = dynamic(() => import('./PinCryptoItem'));

interface CryptoData {
    name: string;
    token: string;
    icon: string;
    price: number;
}

interface SearchCryptoProps {
    open: boolean,
    onClose: () => void,
    setToken: (token: string, icon: string, price: number) => void,
}

const SearchCrypto: React.FC<SearchCryptoProps> = ({
    open,
    onClose,
    setToken
}) => {
    const [searchValue, setSearchValue] = useState('');
    const [filteredData, setFilteredData] = useState<CryptoData[]>([]);
    const [data, setData] = useState<CryptoData[]>([]);
    const [pindata, setPindata] = useState<CryptoData[]>([]);
    const [popdata, setPopdata] = useState<CryptoData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch data from the APIs
        const fetchData = async () => {
            try {
                const [cryptoResponse, pinCryptoResponse, popCryptoResponse] = await Promise.all([
                    fetch('/api/cryptos'),
                    fetch('/api/pinned_cryptos'),
                    fetch('/api/popular_cryptos')
                ]);

                const cryptoData = await cryptoResponse.json();
                const pinCryptoData = await pinCryptoResponse.json();
                const popCryptoData = await popCryptoResponse.json();

                console.log('cryptoData:', cryptoData);
                console.log('pinCryptoData:', pinCryptoData);
                console.log('popCryptoData:', popCryptoData);

                setData(Array.isArray(cryptoData) ? cryptoData : []);
                setPindata(Array.isArray(pinCryptoData) ? pinCryptoData : []);
                setPopdata(Array.isArray(popCryptoData) ? popCryptoData : []);

                setLoading(false); // Set loading to false after all data is fetched
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Filter the data based on the search value
        const filteredTokens = data.filter(item =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
        );

        setFilteredData(filteredTokens);
    }, [searchValue, data]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    return (
        <div>
            <Modal
                title="Select a token"
                centered
                style={{ height: "600px", maxHeight: "600px", overflowY: 'auto' }}
                open={open}
                onOk={onClose}
                onCancel={onClose}
                footer={null}
            >
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <Spin size="large" />
                    </div>
                ) : (
                    <>
                        <Input
                            placeholder="Search token"
                            value={searchValue}
                            onChange={handleSearchChange}
                        />

                        <div className="p-2">
                            {pindata.map(item => (
                                <PinCryptoItem
                                    key={item.token}
                                    name={item.name}
                                    token={item.token}
                                    icon={item.icon}
                                    price={item.price}
                                    setToken={() => setToken(item.token, item.icon, item.price)}
                                />
                            ))}
                        </div>

                        <hr className="mb-2" />
                        {
                            searchValue === '' ? (
                                popdata.map(item => (
                                    <CryptoItem
                                        key={item.token}
                                        name={item.name}
                                        token={item.token}
                                        icon={item.icon}
                                        price={item.price}
                                        setToken={() => setToken(item.token, item.icon, item.price)}
                                    />
                                ))) : (filteredData.map(item => (
                                    <CryptoItem
                                        key={item.token}
                                        name={item.name}
                                        token={item.token}
                                        icon={item.icon}
                                        price={item.price}
                                        setToken={() => setToken(item.token, item.icon, item.price)}
                                    />
                                )))
                        }
                    </>
                )}
            </Modal>
        </div>
    );
}

export default SearchCrypto;
