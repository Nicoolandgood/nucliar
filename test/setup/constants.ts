export const TEST_COMPONENT_NAMES = new Map<string, string>([
    ["Test", "Test"], 
    ["test", "Test"], 
    ["my-awesome-test", "MyAwesomeTest"], 
    ["some_test_component", "SomeTestComponent"],
    ["CakeIsALie", "CakeIsALie"], 
    ["noWayThisWorks", "NoWayThisWorks"],
]);

export const TEST_TEMPLATE = "{{it.computedName}} is a lie.";
export const TEST_TEMPLATE_RESULT = (v: string) => `${v} is a lie.`;