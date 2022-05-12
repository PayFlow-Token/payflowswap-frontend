import { useEffect } from 'react'
import { usePayflowBusdPrice } from 'hooks/useBUSDPrice'

const useGetDocumentTitlePrice = () => {
  const cakePriceBusd = usePayflowBusdPrice()
  useEffect(() => {
    const cakePriceBusdString = cakePriceBusd ? cakePriceBusd.toFixed(2) : ''
    document.title = `Pancake Swap - ${cakePriceBusdString}`
  }, [cakePriceBusd])
}
export default useGetDocumentTitlePrice
