test('should toggle on click', () => {
    const result = toggle([{
        iban: "::iban1::",
        isSelected: false
    }], "::iban1::")
    expect(result[0].isSelected).toBe(true);
});

test('should toggle on click', () => {
    const result = toggle(
        [
            {
                iban: "::iban1::",
                isSelected: true
            },
            {
                iban: "::iban2::",
                isSelected: false
            }
        ],
        "::iban2::")
    expect(result).toEqual(
        [{iban: "::iban1::",isSelected: false},{iban: "::iban2::",isSelected: true}]);
});

test('should toggle without mutation', () => {
    const data = [{
        iban: "::iban1::",
        isSelected: false
    }]
    const result = toggle(data, "::unknown::")
    expect(result == data).toBe(false);
});

const toggle = (data, item) => {    
    return data.map((v, i) => {        
        let selected = false;
        if (v.iban == item) {
            selected = true;            
        }
        return Object.assign({}, v, {
            isSelected: selected
        })            
    })
}