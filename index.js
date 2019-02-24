'use strict';

// `STORE` is responsible for storing the underlying data
// that our app needs to keep track of in order to work.
//
// for a shopping list, our data model is pretty simple.
// we just have an array of shopping list items. each one
// is an object with a `name` and a `checked` property that
// indicates if it's checked off or not.
// we're pre-adding items to the shopping list so there's
// something to see when the page first loads.


const STORE = [
  {id: cuid(), name: 'apples', checked: false},
  {id: cuid(), name: 'oranges', checked: false},
  {id: cuid(), name: 'milk', checked: true},
  {id: cuid(), name: 'bread', checked: false}
];


function generateItemElement(item) {
  return `
    <li data-item-id="${item.id}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

function generateShoppinglist(shoppingList){
  console.log('Generating shopping list element');
  const items = shoppingList.map((item,index)=> generateItemElement(item,index));
  return items.join('');
}

function renderShoppingList() {
  // this function will be responsible for rendering the shopping list in
  // the DOM
  console.log('`renderShoppingList` ran');
  
  const shoppingListItemsString = generateShoppinglist(STORE);
  $('.js-shopping-list').html(shoppingListItemsString);
}


function handleNewItemSubmit() {
  // this function will be responsible for when users add a new shopping list item
  $('#js-shopping-list-form').submit(function(event){
    event.preventDefault();
    const itemName = $('.js-shopping-list-entry').val();
    $(this).find('.js-shopping-list-entry').val('');
    console.log(itemName);
    console.log('`handleNewItemSubmit` ran');
    STORE.push({id: cuid(), name: itemName, checked: false});
    renderShoppingList();
  });
  
}

function getItemIdFromElement(item){
  return $(item).closest('li').data('item-id');
}

function updateItemToggleChecked(itemId){
  const item = STORE.find(item => item.id ===itemId);
  item.checked = !item.checked;
  renderShoppingList();
  
  
}

function handleItemCheckClicked() {
  // this function will be responsible for when users click the "check" button on
  // a shopping list item.
  $('.js-shopping-list').on('click','.js-item-toggle',function(event){
      const itemId = getItemIdFromElement(this);
      
      updateItemToggleChecked(itemId);
      console.log('`handleItemCheckClicked` ran');
      renderShoppingList();
  });
  
}


function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  console.log('`handleDeleteItemClicked` ran')
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();

}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);