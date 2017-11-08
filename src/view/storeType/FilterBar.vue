<template>
  <div class="filterbar" :style="{'top': top + 'px'}">
    <div class="container">
      <div class="row">
        <div class="col" :class="{'selected': index == selectedIndexMenu}" @click="handleShowDialog(barMenu, index)" v-for="(barMenu, index) in barMenus">
          {{barMenu.name}}<i :class="index == selectedIndexMenu ? barMenu.selectIcon : barMenu.defaultIcon"></i>
        </div>
      </div>
      <filter-bar-pop :filterTop="top" :show-dialog="isShow" :hasTabHeader="hasTabHeader" :menu="selectedMenu" @changeTab="handleChangeTab"
        @changeMainItem="handleChangeMainItem" @changeSelect="changeSelect" @closeDialog="handleCloseDialog">
      </filter-bar-pop>
    </div>
  </div>
</template>
<script>
  import FilterBarPop from './FilterBarPop.vue'

  export default {
    props: {
      barMenus: {
        type: Array,
        required: true,
        validator: function (value) {
          //TODO:验证数据有效性
          return true;
        }
      },
      top: String
    },
    data() {
      return {
        isShow: false,
        hasTabHeader: false,
        selectedMenu: {},
        selectedIndexMenu: undefined
      }
    },
    methods: {
      handleShowDialog(menu, index) {
        this.isShow = true;
        this.selectedMenu = menu;
        this.selectedIndexMenu = index;
        if (menu.showTabHeader) {
          this.hasTabHeader = true;
        } else {
          this.hasTabHeader = false;
        }
        let _menu = JSON.parse(JSON.stringify(menu));
        _menu.tabs = {};
        this.$emit('showDialog', _menu);
      },
      handleChangeTab(tab) {
        this.$emit('changeTab', tab.index);
      },
      handleChangeMainItem(mainItem) {
        let _mainItem = JSON.parse(JSON.stringify(mainItem));
        this.$emit('changeMainItem', _mainItem);
      },
      handleCloseDialog() {
        this.isShow = false;
        this.selectedIndexMenu = -1;
        this.$emit('closeDialog');
      },
      changeSelect() {
        var selectData = [];
        this.barMenus.forEach(function (barMenu, index, arr) {
          let _selectBarData = {};
          // console.log("barMenu.name: " + barMenu.name);

          _selectBarData.name = barMenu.name;
          _selectBarData.value = barMenu.value;
          _selectBarData.tab = {};
          let tab = barMenu.tabs[barMenu.selectIndex];
          // console.log("tab.name: " + tab.name);
          _selectBarData.tab.name = tab.name;
          _selectBarData.tab.value = tab.value;
          let mainItem = tab.detailList[tab.selectIndex];
          _selectBarData.tab.mainItem = {}
          // console.log("mainItem.name: " + mainItem.name);          
          _selectBarData.tab.mainItem.name = mainItem.name;
          _selectBarData.tab.mainItem.value = mainItem.vaule;
          let subItem = false;
          if (mainItem.list) {
            subItem = mainItem.list[mainItem.selectIndex];
            _selectBarData.tab.mainItem.subItem = {};
            // console.log("subItem.name: " + subItem.name);                      
            _selectBarData.tab.mainItem.subItem.name = subItem.name;
            _selectBarData.tab.mainItem.subItem.value = subItem.value;
          } else {
            _selectBarData.tab.mainItem.subItem = subItem;
          }
          selectData.push(_selectBarData);
        });
        this.$emit('changeSelect', selectData);
      }
    },
    created (){
        this.$http.get("/eb-web-api/mobile/store/queryMainCategory").then((res)=>{
          this.firstList = res.body.listCategory;
          // console.log(this.firstList)
        }).catch((res)=>{

        })
    },
    components: {
      'filter-bar-pop': FilterBarPop
    }
  }
</script>
<style lang="scss">
  .filterbar {
    width: 100%;
    background: #fff;
    // position: fixed;
    // top: 0;
    // left: 0;
    // right: 0;
    .container {
      margin-top: 18px;
      width: 100%;
      border-top: 1px solid #e1e1e1;
      border-bottom: 1px solid #e1e1e1;
      position: relative;
      .row {
        display: flex;
        display: -ms-flexbox;
        display: -moz-box;
        display: -webkit-box;
        display: -webkit-flex;
        flex-direction: row;
        -webkit-flex-direction: row;
        justify-content: space-around;
        -webkit-box-pack: space-around;
        -moz-box-pack: space-around;
        -ms-flex-pack: space-around;
        width: 90%;
        margin: 0 auto;
        height: 74px;
        line-height: 74px;
        font-size: 26px;
        color: #333;
        .selected {
          color: #3da4f1;
        }
        .col {
          font-size: 26px;
          i {
            margin: 0 auto;
            margin-left: 10px;
            display: inline-block;
            width: 25px;
            height: 18px;
            background: url(../../assets/imgs/grayTriangle.png) no-repeat center;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
</style>