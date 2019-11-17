const formatPrice = (x, currency = 'USD') => 
{
  switch (currency) 
  {
    case 'BRL':
      return x.toFixed(2).replace('.', ',');
    default:
      return x.toFixed(2);
  }
};

const isObjectEmpty = (obj) => 
{
  if (obj === null || obj === undefined) return true

  return (Object.entries(obj).length === 0 && obj.constructor === Object)
};

const getUniqueString = (len = 36, start = 2, end = 9) =>
{
    return Math.random().toString(len).substr(start, end);
}
  
export default {
  formatPrice,
  isObjectEmpty,
  getUniqueString
};