package {
	import superTests.SuperTests;
	import tests.ImplicitThis;
	import interfaceTests.InterfaceTester;
	import defaultParameters.DefaultParamTests;
	import fqn.SelfReferences;

	public class Main {
		public function Main() {
		}
		
		public static var testSuiteClasses = [
			MathTests,
			DefaultArguments,
			//SuperTests,
			ImplicitThis,
			DefaultParamTests,
			InterfaceTester,
			SelfReferences
		];
		
		public static function run():void {
			testAll();
		}
		
		public static function testAll():void {
			for each(var suite:* in testSuiteClasses) {
				testSuite(suite);
			}
		}
		
		public static function testSuite(suite:*):void {
			var suiteName:String = /^\[class (.*)\]$/.exec(suite.toString())[1];
			
			for each(var testName:String in suite.testNames) {
				trace('Testing ' + suiteName + '::' + testName + '...');
				suite[testName]();
			}
		}
	}
}