import { Await, useLoaderData } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
import {MouseEvent, Suspense} from 'react';
import styles from './Product.module.css';
import {cartActions} from "../../store/cart.slice.ts";
import {useDispatch} from "react-redux";
import {AppDispath} from "../../store/store.ts";
import {ProductCardProps} from "../../components/ProductCard/ProductCard.props.ts";
export function Product(props: ProductCardProps) {
    const data = useLoaderData() as { data: Product };
    const dispatch = useDispatch<AppDispath>();

    const add = (e: MouseEvent) => {
        e.preventDefault();
        dispatch(cartActions.add(props.id));
    };


    return (
        <div className={styles.productContainer}>
            <div className={styles.head}>
                <button className={styles.button_svg}>
                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 1L1 5.68393L6 10.6839" stroke="#111719" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                </button>


                <button className={styles['add-to-cart']} onClick={add}>
                    <img src="/cart-button-icon.svg" alt="Добавить в корзину" />
                    <p>В Корзину</p>
                </button>
            </div>
            <Suspense fallback={'Загружаю...'}>
                <Await
                    resolve={data.data}
                >
                    {({ data }: { data: Product }) => (
                        <div className={styles.product}>
                            <div className={styles.head}>
                                <button className={styles.button_svg}>
                                    <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 1L1 5.68393L6 10.6839" stroke="#111719" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                            <div className={styles.productContent}>
                                <img src={data.image} alt={data.name} className={styles.productImage} />
                                <div className={styles.productDetails}>
                                    <h1 className={styles.productName}>{data.name}</h1>
                                    <div className={styles.productPrice}>
                                        <p className={styles.priceLabel}>Цена</p>
                                        <p className={styles.priceValue}>300</p>
                                        <p className={styles.currency}>₽</p>
                                    </div>


                                    <p className={styles.productRating}>Rating: {data.rating}</p>
                                    <ul className={styles.productIngredients}>
                                        {data.ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                        </div>


                    )}
                </Await>
            </Suspense>
        </div>
    );
}