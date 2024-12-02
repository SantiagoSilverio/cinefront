import React, { useState, useEffect } from 'react';
import { PriceAdd, Price } from '../../types/price';
import Link from 'next/link';

interface PriceFormProps {
    price?: Price;
    onSave: (price: PriceAdd) => void;
}

const PriceForm: React.FC<PriceFormProps> = ({ price, onSave }) => {
    const [name, setName] = useState(price ? price.name : '');
    const [amount, setAmount] = useState(price ? price.amount.toString() : '');

    useEffect(() => {
        if (price) {
            setName(price.name);
            setAmount(price.amount.toString());
        }
    }, [price]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, amount: parseFloat(amount) });
        setName('');
        setAmount('');
    };

    return (
        <form id="price-form"  onSubmit={handleSubmit} className="price-form">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nuevo precio"
                required
                className="input-field"
            />
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Cantidad"
                required
                className="input-field"
            />

            <div className="button-container1">
                <Link href="/admin/price">
                    <button className="btn">Ir a la lista</button>
                </Link>
                <button type="submit" className="submit-button">Guardar</button>
            </div>
        </form>
    );
};

export default PriceForm;