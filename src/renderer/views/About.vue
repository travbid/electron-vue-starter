<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input v-model="a" /> + <input v-model="b" /> = <span>{{ans}}</span>
    <div>{{errMsg}}</div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Proc from "@/api/proc";

export default defineComponent({
	data() {
		return {
			a: "0",
			b: "0",
			ans: 0,
			errMsg: "",
		}
	},
	watch: {
		a(val: string, oldVal: string) {
			this.errMsg = "";
			const na = parseInt(val);
			const nb = parseInt(this.b);
			Proc.call(na, nb).then((res: any) => {
				if (res === null) { this.errMsg = "(The left side uses Native Modules, so won't work in dev mode)"; }
				this.ans = res;
			}).catch((reason: any) => console.log("adder catch:", reason));
		},
		b(val: string, oldVal: string) {
			this.ans = parseInt(this.a) + parseInt(val);
		}
	}
})
</script>