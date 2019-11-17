import util from './util';


export function getCartItemByID(id, cart) 
{
    const cartItem = cart.filter((cartDataItem) => 
    {
        return (cartDataItem.id === id) 
    });

    return cartItem[0]
}

export function getProductItem(item, products) 
{
    const productItem = products.filter((productDataItem) => 
    {
        return (productDataItem.id === item.id) 
    });

    return productItem[0]
}

export function getProductItemByID(id, products) 
{
    const productItem = products.filter((productDataItem) => 
    {
        return (productDataItem.id === id) 
    });

    return productItem[0]
}

export function getProductLevelOptionItemByOptionID(productItem, levelOptionID)
{
    const { options } = productItem

    // check if product has no level options
    if (util.isObjectEmpty(options)) return ""

    const levelOptionItems = options.items.filter((levelOptionDataItem) => 
    {
        return (levelOptionDataItem.id === levelOptionID) 
    });

    return levelOptionItems[0].name
}

export function getProductExtraOptionItemByOptionID(productItem, extraOptionID)
{
    const { extra } = productItem

    // check if product has no extra options
    if (util.isObjectEmpty(extra)) return ""

    const optionItems = extra.items.filter((optionDataItem) => 
    {
        return (optionDataItem.id === extraOptionID) 
    });

    return optionItems[0]
}