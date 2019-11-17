import React, { Component } from "react"
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import util from '../../utils/util';
import { getProductItemByID, getCartItemByID } from "../../utils/productTools"
import { addToCart, removeFromCart } from "../../data/store/Cart/actions"

import ProductView from "../panels/ProductView"
import AddProductView from "../panels/AddProductView";
import ProductItem from "../panels/support/ProductItem"
import CheckoutFloater from "../panels/support/CheckoutFloater";
import RemoveProductView from "../panels/RemoveProductView";
import MainSubHeader from "../headers/MainSubHeader";

export default class ProductScreen extends Component
{
    targetElement = null;

    constructor(props)
    {
        super(props);

        this.state = {
            isProductViewOpen: false,
            isAddProductViewOpen: false,
            isRemoveProductViewOpen: false,
            itemSelectedForView: null
        }
    }

    componentDidMount()
    {
        this.targetElement = document.querySelector('body');
        this.targetElement.className = "app-container products"
    }

    onShowAddProductView = (id) =>
    {
        const { products } = this.props.store
        const productItem = getProductItemByID(id, products)
        
        // add a product immediately if no level nor extra options available
        if (util.isObjectEmpty(productItem.options) && util.isObjectEmpty(productItem.extra)) 
        {
            this.addItemToCart({
                item: {
                    uid: util.getUniqueString(10),
                    id: id,
                    price: productItem.price,
                    optionSelected: undefined,
                    extraOptionSelected: undefined,
                },
                totalItemPrice: parseFloat(productItem.price)
            })
            return;
        }

        // disable scrolling
        disableBodyScroll(this.targetElement);

        this.setState({
            isAddProductViewOpen: true,
            itemSelectedForView: {
                id: id,
                options: productItem.options,
                extra: productItem.extra,
                price: productItem.price
            }
        })
    }

    onProductRemove = (id) =>
    {
        const { cart, products } = this.props.store
        const productItem = getProductItemByID(id, products)

        // add a product immediately if no level nor extra options available
        if (util.isObjectEmpty(productItem.options) && util.isObjectEmpty(productItem.extra)) 
        {
            const cartItem = getCartItemByID(id, cart.items)
            this.removeItemFromCart({
                item: {
                    id: id,
                    optionSelected: cartItem.uid
                }
            })
            return;
        }

        // disable scrolling
        disableBodyScroll(this.targetElement);

        this.setState({
            isRemoveProductViewOpen: true,
            itemSelectedForView: {
                id: id,
                name: productItem.name,
                cart: cart,
                products: products
            }
        })
    }

    onShowProductInfoView = (id) =>
    {
        disableBodyScroll(this.targetElement);

        const { products } = this.props.store
        const productItem = getProductItemByID(id, products)
        
        this.setState({
            isProductViewOpen: true,
            itemSelectedForView: {
                id: id,
                name: productItem.name,
                price: productItem.price,
                description: productItem.description,
                thumb: productItem.images[0].large
            }
        })
    }

    onCloseProductView = () =>
    {
        enableBodyScroll(this.targetElement);

        this.setState({
            isProductViewOpen: false
        })
    }

    onCloseAddProductView = (addedItem) =>
    {
        // check if we have an item to add
        if (!util.isObjectEmpty(addedItem))
        {
            this.addItemToCart(addedItem)
        }

        enableBodyScroll(this.targetElement);

        this.setState({
            isAddProductViewOpen: false
        })
    }

    onCloseRemoveProductView = (removeItem) =>
    {
        // check if we have an item to add
        if (!util.isObjectEmpty(removeItem))
        {
            this.removeItemFromCart(removeItem)
        }

        enableBodyScroll(this.targetElement);

        this.setState({
            isRemoveProductViewOpen: false
        })
    }

    addItemToCart(item)
    {
        const { dispatch } = this.props.store

        dispatch(addToCart(item))
    }

    removeItemFromCart(item)
    {
        const { dispatch } = this.props.store

        dispatch(removeFromCart(item))
    }

    getItemCartCount(item, cart)
    {
        const totalCount = cart.items.filter((cartItem) => 
        {
            return (cartItem.id === item.id) 
        });

        return totalCount.length
    }

    render() {
        const { cart, productsFetched, categories, products } = this.props.store

        if (!productsFetched)
        {
            return (<div><p>No Products</p></div>)
        }

        // TOP ITEMS 
        const topItemsGroupLabel = categories.filter((cat) => 
        {
            return (cat.name === "top_menu_items") 
        })[0].label;
        const topItems = products.filter((item) => 
        {
            return (item.category === "top_menu_items") 
        });
        const topItemsList = topItems.map((item) => 
        {
            const { id, name, price, images } = item
            const cartTotal = this.getItemCartCount(item, cart)
           
            return (
                <ProductItem key={item.id} 
                    id={id}
                    name={name}
                    price={price}
                    thumb={images[0].small}
                    cartTotal={cartTotal}
                    onShowProductInfoView={this.onShowProductInfoView} 
                    onShowAddProductView={this.onShowAddProductView} 
                    onProductRemove={this.onProductRemove} 
                />
            )
        });

        // BITES
        const bitesGroupLabel = categories.filter((cat) => 
        {
            return (cat.name === "bites") 
        })[0].label;

        const biteItems = products.filter((item) => 
        {
            return (item.category === "bites") 
        });

        const biteList = biteItems.map((item) => 
        {
            const { id, name, price, images } = item
            const cartTotal = this.getItemCartCount(item, cart)

            return (
                <ProductItem key={item.id}
                    id={id}
                    name={name}
                    price={price}
                    thumb={images[0].small}
                    cartTotal={cartTotal}
                    onShowProductInfoView={this.onShowProductInfoView} 
                    onShowAddProductView={this.onShowAddProductView} 
                    onProductRemove={this.onProductRemove} 
                />
            )
        });

        // STARTERS
        const startersGroupLabel = categories.filter((cat) => 
        {
            return (cat.name === "starters") 
        })[0].label;
        const startersItems = products.filter((item) => 
        {
            return (item.category === "starters") 
        });
        const startersList = startersItems.map((item) => 
        {
            const { id, name, price, images } = item
            const cartTotal = this.getItemCartCount(item, cart)

            return (
                <ProductItem key={item.id} 
                    id={id}
                    name={name}
                    price={price}
                    thumb={images[0].small}
                    cartTotal={cartTotal}
                    onShowProductInfoView={this.onShowProductInfoView} 
                    onShowAddProductView={this.onShowAddProductView} 
                    onProductRemove={this.onProductRemove} 
                />
            )
        });

        return (
            <div className="ui-screen products-list">
                <MainSubHeader title="Get beer on us!" body="Tap an image to add to cart" />                    

                <ProductView 
                    isProductViewOpen={this.state.isProductViewOpen} 
                    onClose={this.onCloseProductView} 
                    {...this.state.itemSelectedForView} 
                />

                <AddProductView 
                    isAddProductViewOpen={this.state.isAddProductViewOpen} 
                    onClose={this.onCloseAddProductView} 
                    {...this.state.itemSelectedForView} 
                />

                <RemoveProductView
                    isRemoveProductViewOpen={this.state.isRemoveProductViewOpen} 
                    onClose={this.onCloseRemoveProductView} 
                    {...this.state.itemSelectedForView} 
                />

                <div className="ui-screen-inner">

                    <div className="products-group-title">
                        {topItemsGroupLabel}
                    </div>
                    <div className="products-group-list products-top-items">
                        {topItemsList}
                    </div>

                    <div className="products-group-title">
                        {bitesGroupLabel}
                    </div>
                    <div className="products-group-list products-bites">
                        {biteList}
                    </div>

                    <div className="products-group-title">
                        {startersGroupLabel}
                    </div>
                    <div className="products-group-list products-bites">
                        {startersList}
                    </div>
                    
                </div>

                <CheckoutFloater onClick={this.handleGoCheckout}
                    cartTotal={cart.count} 
                    cartTotalPrice={cart.total} 
                />
            
            </div>
        )
    }

    handleGoCheckout = (e) => 
    {
        const { history } = this.props.router

        history.push("./cart")
    }
}