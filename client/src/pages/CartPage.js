import { Box, makeStyles, Typography, Button, Grid } from '@material-ui/core';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getCartItems, removeFromCart } from '../actions/cartActions';

import CartItem from '../components/cart/CartItem';
import TotalView from '../components/cart/TotalView';
import EmptyCart from '../components/cart/EmptyCart';



const useStyle = makeStyles(theme => ({
    component: {
        marginTop: 55,
        padding: '30px 6%',
        display: 'flex',
    },
    leftComponent: {
        paddingRight: 15,
    },
    header: {
        padding: '15px 24px',
        background: '#fff'
    },
    bottom: {
        padding: '16px 22px',
        background: '#fff',
        boxShadow: '0 -2px 10px 0 rgb(0 0 0 / 10%)',
        borderTop: '1px solid #f0f0f0'
    },
    placeOrder: {
        display: 'flex',
        marginLeft: 'auto',
        background: '#fb641b',
        color: '#fff',
        borderRadius: 2,
        width: 250,
        height: 51
    }
}));

const Cart = () => {
    const classes = useStyle();

    const { cartItems } = useSelector(state => state.cartReducer);
    const { isAuthenticate } = useSelector((state) => state.userReducer);

    const dispatch = useDispatch();
    
    useEffect(() => {
        if(isAuthenticate){
            dispatch(getCartItems());
        }
    }, [isAuthenticate]);

    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id));
    }

    const placeOrder = ()=> {
        window.location.replace("/checkout");
    }

    return (
        <>
        { cartItems.length ? 
            <Grid container className={classes.component}>
                <Grid item lg={9} md={9} sm={12} xs={12} className={classes.leftComponent}>
                    <Box className={classes.header}>
                        <Typography style={{fontWeight: 600, fontSize: 18}}>My Cart ({cartItems?.length})</Typography>
                    </Box>
                        {   cartItems.map(item => (
                                <CartItem item={item} removeItemFromCart={removeItemFromCart}/>
                            ))
                        }
                    <Box className={classes.bottom}>
                        <Button onClick={placeOrder} variant="contained" className={classes.placeOrder} style={{backgroundColor:"#fb641b"}}>Place Order</Button>
                    </Box>
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TotalView />
                </Grid>
            </Grid> : <EmptyCart />
        }
        </>

    )
}

export default Cart;
