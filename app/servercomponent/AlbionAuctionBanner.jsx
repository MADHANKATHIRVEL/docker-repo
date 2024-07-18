'use client';
import './scss/albion-auction-banner.scss';
import Image from 'next/image';
import albionAuctionPlaceHolderImage from '@/assets/albion-auction-banner.webp';
import whiteGlassEffect from '@/assets/white-glass-effect.webp'
import { Button } from 'antd';

export default function AlbionAuctionBanner() {
  return (
    <section className='albionauctionbanner'>
        <Image
            src={whiteGlassEffect}
            className='white-glass-effect'
            loading='lazy'
        />
        <div className='auction-content'>
            <span>Unlock a Wealth of Property Opportunities</span>
            <h2>Explore All Auctions Under One Roof!</h2>
            <Button
                className='auction-redirect-button'
                href='https://www.albionbankauctions.com/'
                target='_blank'
            >
                Join Now
            </Button>
        </div>
        <Image placeholder="blur"
            src={albionAuctionPlaceHolderImage}
            alt='Albion Auction Place Holder Image'
            loading='lazy'
            className='albion-auction-place-holder'
        />
    </section>
  )
}
