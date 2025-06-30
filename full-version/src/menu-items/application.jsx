// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
    IconBasket
} from '@tabler/icons-react';

// constant
const icons = {
    IconBasket
};

// ==============================|| MENU ITEMS - PRODUCTS ||============================== //

const products = {
                    id: 'products',
                    title: <FormattedMessage id="products" />,
    icon: icons.IconBasket,
                    type: 'item',
    url: '/apps/e-commerce/products',
                    breadcrumbs: false
};

// Export only the main products page - cart accessible via header, product details via clicking products
export { products };
