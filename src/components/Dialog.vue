<script setup lang='ts'>
import { ref } from 'vue'
import goodsSelectList from '@/utils/data';
import { GoodType } from '@/types'

const dialogRef = ref<HTMLDialogElement>()

defineExpose({
  dialogRef
})

const emits = defineEmits(["addGood"])

const add = (good: GoodType) => {
  emits("addGood", {...good})
}

</script>

<template>
  <div id="dialog">
    <dialog ref="dialogRef">
      <div class="container">
        <div class="content">
          <table>
            <thead>
              <tr>
                <th>商品名称</th>
                <th>数量</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr class="good" v-for="good in goodsSelectList" :key="good.id">
                <td><div class="box"><i>{{ good.name }}</i></div></td>
                <td><div class="box"><input type="number" min="1" v-model="good.count"></div></td>
                <td><button @click="add(good)">添加</button></td>
              </tr>
            </tbody>
          </table>
          <!-- <div class="good" v-for="good in goodsSelectList" :key="good.id">
            <div class="name">
              {{ good.name }}
            </div>
            <div class="count">
              <input type="number" min="1" v-model="good.count">
            </div>
            <button @click="add(good)">添加</button>
          </div> -->
        </div>
        <div class="close">
          <button @click="dialogRef?.close()">关闭</button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<style lang='scss' scoped>
#dialog {
  dialog {
    width: 100%;
    height: 100vh;
    border: 0;
    padding: 20px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .5);
    backdrop-filter: blur(1px);

    .container {
      width: 100%;
      max-width: 900px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px;
      background-color: #fff;
      box-shadow: 0 0 5px 0px #696969;
      border-radius: 4px;
      .content {
        table {
          border-collapse: collapse;
          border-spacing: 0;
          width: 100%;
          max-width: 900px;
          margin: auto;
          thead, tbody {
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
                  input {
                    display: inline-block;
                    width: 50px;
                    border: 1px solid #000;
                    border-radius: 2px;
                    outline: none;
                  }
                }
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
      .close {
        display: grid;
        justify-content: end;
        margin-top: 10px;
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
}
</style>