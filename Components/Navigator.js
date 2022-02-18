import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ProductCard from './ProductCard';
import CreateProduct from './CreateProduct';
import ProductList from './ProductList';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DataContext} from '../Store/DataProvider';
import Actions from '../Store/Actions';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  const {dispatch} = useContext(DataContext);

  return (
    <Drawer.Navigator screenOptions={{}}>
      <Drawer.Screen
        name="ProductList"
        component={ProductList}
        options={{title: 'Список товаров'}}
      />
      <Drawer.Screen
        name="CreateProduct"
        component={CreateProduct}
        options={{title: 'Создать новый товар'}}
      />
      <Drawer.Screen
        name="ProductCard"
        component={ProductCard}
        options={{title: 'Карточка товара', drawerItemStyle: {height: 0}}}
      />
    </Drawer.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="ProductList">
    //     <Stack.Screen
    //       name="ProductList"
    //       component={ProductList}
    //       options={{
    //         title: 'Список товаров',
    //       }}
    //     />
    //     <Stack.Screen
    //       name="ProductCard"
    //       component={ProductCard}
    //       options={{title: 'Карточка товара', headerBackVisible: true}}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default Navigator;
