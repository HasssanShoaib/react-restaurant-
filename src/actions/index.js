import Service from '../components/hoc/withServiceContext';
import dispatch from '../components/hoc/withServiceContext';

const Requested=()=>{
    return{
        type: 'FETCH_DATA_REQUEST'
    }
};

export const foodRemove = (foodId) => {
    return{
        type: 'FOOD_REMOVE',
        payload: foodId
    }
};
export const foodDecrease = (foodId) => {
    return{
        type: 'FOOD_DECREASE',
        payload: foodId
    }
};
export const foodIncrease = (foodId) => {
    return{
        type: 'FOOD_ADDED',
        payload: foodId
    }
};

export const dataLoaded = (newData) =>{
    return{
        type: 'FETCH_DATA_SUCCESS',
        payload: newData
    }
};
const dataError = (error) =>{
    return{
        type: 'FETCH_DATA_FAILURE',
        payload: error
    }
};


  const showFilteredMenu = (category)=>
  {
      return{
      type: 'SHOW_FILTERED_MENU',
      payload: category
      }
  };

    const showMenu = (menuData) => {
    return{
      type: 'SHOW_MENU_SUCCESS',
      payload: menuData
    }
  };


const menuError = (error) =>{
    return{
        type: 'FETCH_MENU_DATA_FAILURE',
        payload: error
    }
};


export const fetchData = (serviceContext, dispatch ) => () => {
    dispatch(Requested());
    serviceContext.getData()
        .then((data) => dispatch(dataLoaded(data)))
        .catch((err) => dispatch(dataError(err)));
};


 const fetchMenuData = (serviceContext, dispatch ) => () => {
    serviceContext.getMenuData()
        .then((MenuData) => dispatch(showMenu(MenuData)))
        .catch((err) => dispatch(menuError(err)));
};


var initialMenuData=fetchMenuData(Service, dispatch);
 

const filterMenuData = (selectedCategory) =>
{
var filteredMenuData = initialMenuData.reduce((filteredMenuData,item)=>
{
    if (item.category===selectedCategory)
    {
        filteredMenuData.push(item);
    }
    return filteredMenuData;
},[]);
    return filteredMenuData;
};



export {
    fetchData,
    dataLoaded,
    fetchMenuData,
    showFilteredMenu,
    filterMenuData,
    //initialMenuData
}

