package cycles {
    import cycles.C;

    class B {
        public static var testNames:Array = [
            'test'
        ];

        public static function test():void {
            Assert.equal("C", C.stupidFunctionName());
        }
		
		public static function stupidFunctionName():String {
			return "B";
		}
    }
}
