<script setup lang='ts'>
import { ref, computed } from 'vue'
import Dialog from '@/components/Dialog.vue'
import { GoodType, GoodsType } from '@/types';

const dialogRefGoods = ref()

const goodsList = ref<GoodsType>([])

const addGood = (good: GoodType) => {
  let js = 0;
  goodsList.value.forEach((item: GoodType) => {
    if (item.id === good.id) {
      item.count = item.count + good.count;
      js++;
    }
  })
  if (good.count <= 0) {
    return
  }
  goodsList.value.forEach((item: GoodType, index: number) => {
    if (item.id === good.id) {
      const rmGood = goodsList.value.splice(index, 1)
      goodsList.value.unshift(rmGood[0])
    }
  })
  if (js === 0) {
    goodsList.value.unshift(good)
  }
}

const remove = (good: GoodType) => {
  if (goodsList.value.length <= 1) return alert("至少保留一个商品")
  goodsList.value = goodsList.value.filter((item: GoodType) => {
    return item.id !== good.id
  })
}

const total = computed(() => {
  return goodsList.value.reduce((first, item) => {
    return first + item.count
  }, 0)
})
</script>

<template>
  <div class="goods">
    <div class="container">
      <table>
        <thead>
          <tr>
            <th>商品</th>
            <th>数量</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr class="good" v-for="good in goodsList" :key="good.id">
            <td class="name">
              <div class="box">
                <i>{{ good.name }}</i><span @click="dialogRefGoods.dialogRef.showModal(good)">...</span>
              </div>
            </td>
            <td>
              <div class="box">
                <i>{{ good.count }}</i>
              </div>
            </td>
            <td><button @click="remove(good)">删除</button></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>总计：{{ total }}</td>
            <td><button @click="dialogRefGoods.dialogRef.show()">添加</button></td>
          </tr>
        </tfoot>
      </table>
    </div>
    <Dialog ref="dialogRefGoods" @addGood="addGood"/>
  </div>
</template>

<style lang='scss' scoped>
.goods {
  padding: 20px;
  .container {
    table {
      border-collapse: collapse;
      border-spacing: 0;
      width: 100%;
      max-width: 900px;
      margin: auto;
      thead, tbody, tfoot {
        tr {
          th, td {
            border: 1px solid #000;
            padding: 5px 10px;
          }
        }
      }
      thead {
        border: 0;
      }
      tbody {
        tr {
          td {
            .box {
              display: flex;
              justify-content: space-between;
              i {
                font-style: normal;
                display: inline-block;
                background-color: #ccc;
                padding: 2px 4px;
                border-radius: 2px;
                flex: 1;
              }
              span {
                width: 30px;
                display: inline-block;
                background-color: #ccc;
                padding: 2px 4px;
                border-radius: 2px;
                margin-left: 2px;
                cursor: pointer;
                text-align: center;
              }
            }
            button {
              background-color: #ff0000;
              color: #fff;
              border: 0;
              border-radius: 4px;
              padding: 5px 10px;
              cursor: pointer;
              &:hover {
                background-color: #ff6b6b;
              }
            }
          }
        }
      }
      tfoot {
        tr {
          td {
            button {
              background-color: #2189ff;
              color: #fff;
              border: 0;
              border-radius: 4px;
              padding: 5px 10px;
              cursor: pointer;
              &:hover {
                background-color: #61abff;
              }
            }
          }
        }
      }
    }
  }
}
</style>