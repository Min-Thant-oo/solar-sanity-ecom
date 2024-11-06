import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";

async function BlackFridayBanner() {
    const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY);

    if(!sale?.isActive) {
        return null;
    }

    return <div>Black Friday Banner</div>;
}

export default BlackFridayBanner;