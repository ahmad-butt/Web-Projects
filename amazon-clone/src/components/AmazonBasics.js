import React from 'react'
import { amazonBasicsProducts } from '../data/data'
import ProductPage from './ProductPage'

function AmazonBasics() {
    return (
        <div className='amazonBasics'>
            <ProductPage products={amazonBasicsProducts}/>
        </div>
    )
}

export default AmazonBasics
