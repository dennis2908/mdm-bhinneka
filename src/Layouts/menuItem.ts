import { MenuItemType } from '@paljs/ui/types';
	
const itemsData = () => {  
  let mbarang = {
    title: 'Barang',
    icon: { name: 'browser-outline' },
    children: [
    {
     title: 'List Barang',
     link: { href: '/barang/barang_list' },
    }
   ]} as MenuItemType;
	
const itemsData: MenuItemType[] = [
  {
    title: 'MASTER',
    group: true,
  },
  mbarang
];

return itemsData;
}

const items: MenuItemType[] = itemsData()


export default items;
