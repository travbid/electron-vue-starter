<template>
  <div class="about">
    <h1>This is an about page</h1>
    <span>{{errMsg}}</span>
    <input v-model="a" /> + <input v-model="b" /> = <span>{{ans}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
// @ts-ignore
import Proc from "@/api/proc.ts";

@Component
export default class About extends Vue {
	a = "0";
	b = "0";
	ans = 0;
	errMsg = "";

	@Watch("a")
	onAChanged(val: string) {
		const na = parseInt(val);
		const nb = parseInt(this.b);
		Proc.call(na, nb).then((res: any) => {
			if (res === null) { this.errMsg = "(The left side uses Native Modules, so won't work in dev mode)"; }
			this.ans = res;
		}).catch((reason: any) => console.log("adder catch:", reason));
	}

	@Watch("b")
	onBChanged(val: string) {
		this.ans = parseInt(this.a) + parseInt(val);
	}
}
</script>