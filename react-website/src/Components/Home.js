import React from 'react'
import './Home.css'
import Product from './Product';
import background from '../home.jpeg';
function Home() {
    return (
        <div className='Home'>
            <div className='home__container'>
                <img className='home__image' src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg' alt='' />
                {/* <img className='home__image' src='https://store-images.s-microsoft.com/image/apps.24594.13510798887500496.393115ce-aadd-41b0-a06b-6de8b907aa10.b4898b91-921e-43ef-aedc-8a0e423c95d5?mode=scale&q=90&h=720&w=1280' alt=''/> */}
                <div className='home__row'>
                    <Product id={102020} info={'Sony Playstation 4 1TB Console - FIFA 20 Bundle'} price={400} imageURL={'https://d11zer3aoz69xt.cloudfront.net/media/catalog/product/cache/1/image/1200x/9df78eab33525d08d6e5fb8d27136e95/s/o/sony_playstation_4_1tb_console_-_fifa_20_bundle_1_1.jpg'} rating={5} />
                    <Product id={6456276} info={'Dell Inspiron 3501 Core i3 10th Generation 4GB RAM 1TB HDD'} price={650} imageURL={'https://www.mega.pk/items_images/Dell+Inspiron+3501+Core+i3+10th+Generation+4GB+RAM+1TB+HDD+Price+in+Pakistan%2C+Specifications%2C+Features%2C+Reviews_-_20965.jpg'} rating={5} />
                </div>
                <div className='home__row'>
                    <Product id={76663838} info={'Lenovo Ideapad L340 15 Core i3 10th Generation 4GB RAM 1TB HDD Dos'} price={672} imageURL={'https://www.mega.pk/items_images/Lenovo+Ideapad+L340+15+Core+i3+10th+Generation+4GB+RAM+1TB+HDD+Dos+Price+in+Pakistan%2C+Specifications%2C+Features%2C+Reviews_-_20760.jpg'} rating={4} />
                    <Product id={696969} info={'Sony PlayStation 5 825GB Digital Edition Console White'} price={1000} imageURL={'https://d11zer3aoz69xt.cloudfront.net/media/catalog/product/cache/1/image/1200x/9df78eab33525d08d6e5fb8d27136e95/s/o/sony-playstation-5-825gb-digital-edition-console-white_1_1.jpg'} rating={5} />
                    <Product id={645738} info={'Microsoft Xbox Series X'} price={850} imageURL={'https://d11zer3aoz69xt.cloudfront.net/media/catalog/product/cache/1/image/1200x/9df78eab33525d08d6e5fb8d27136e95/t/h/the-all-new-xbox-series-x_1.jpg'} rating={2} />
                </div>
                <Product id={545455} info={'Here are best Running shoes'} price={29.9} imageURL={'https://static3.fashionbeans.com/wp-content/uploads/2020/01/michal-kubalczyk-oL-gSFVpI6A-unsplash-675x340.jpg'} rating={3} />
                <div className='home__row'>
                </div>
            </div>
        </div>
    )
}

export default Home