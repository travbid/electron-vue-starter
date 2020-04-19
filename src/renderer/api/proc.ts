
class Proc {
	api = (window as any).api;

	call = (...args: any[]): Promise<any> => {
		if (process.env.NODE_ENV === "production") {
			return this.api.invoke("adder", ...args);
		} else {
			return Promise.resolve<any>(null);
		}
	}
}

const ProcInstance = new Proc();

export default ProcInstance;
