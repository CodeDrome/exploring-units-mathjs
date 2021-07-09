
window.onload = function()
{
    output("Math.js Units<br>=============<br><br>");

    // createAndConvert();
    // arithmetic();
    // valueProperty();
    // compatibility();
    // astronomical();
    // gravity();
    // power();
    // gallons();
    bitsAndBytes();
}


function output(text)
{
    const p = document.createElement("p");
    p.innerHTML = text;
    document.body.appendChild(p);
}


function createAndConvert()
{
    // create a few math.unit objects
    // we need to specify the value and the unit
    const centimetres = math.unit(50, 'cm');
    const metres = math.unit(0.5, 'm');
    const grams = math.unit(500, 'gram');

    // this will display the value and unit, eg "50 cm"
    output("Units as created<br>----------------");
    output(`centimetres: ${centimetres}`);
    output(`metres: ${metres}`);
    output(`grams: ${grams}`);

    output("<br>");

    // units can be converted both within the same system,
    // eg centimetres to metres, or different systems
    // eg metres to feet
    output("Converted to other units<br>------------------------");
    output(`centimetres to metres: ${centimetres.to('meter')}`);
    output(`metres to feet: ${metres.to('foot')}`);
    output(`grams to kilograms: ${grams.to('kilogram')}`);

    output("<br>");

    // toNumber gets the numeric value
    output("toNumber<br>--------");
    output(`centimetres.toNumber(): ${centimetres.toNumber()}`);
    output(`metres.toNumber(): ${metres.toNumber()}`);
    output(`grams.toNumber(): ${grams.toNumber()}`);

    output("<br>");

    // all units are stored internally in SI Units
    // which can be accessed using the toSI method
    output("toSI<br>----");
    output(`centimetres.toSI(): ${centimetres.toSI()}`);
    output(`metres.toSI(): ${metres.toSI()}`);
    output(`grams.toSI(): ${grams.toSI()}`);
}


function arithmetic()
{
    const centimetres = math.unit(25, 'cm');
    const metres = math.unit(2.5, 'm');

    // check equality
    output(`centimetres.equals(metres): ${centimetres.equals(metres)}`);

    output("<br>");

    // addition
    // units are normalized so we get the correct result
    // the result is in the unit of the first argument,
    // in this case centimetres
    const length = math.add(centimetres, metres);
    output(`math.add(centimetres, metres): ${length}`);

    output("<br>");

    // multiplication & exponentiation
    // units are set as appropriate,
    // in this case m^2 and m^3 respectively
    const area = math.multiply(metres, metres);
    output(`math.multiply(metres, metres): ${area.to('m^2')}`);
    output(`math.pow(metres, 3): ${math.pow(metres, 3)}`);
}


function valueProperty()
{
    const centimetres = math.unit(50, 'cm');

    output(`centimetres: ${centimetres}`);

    output(`centimetres.value: ${centimetres.value}`);

    // setting value will give a result in metres
    // despite the unit being cm
    centimetres.value = 150;
    output(`centimetres.value = 150: ${centimetres}`); // metres

    output("VALUE IS NOW 150 m, not cm WHICH IS PROBABLY UNINTENDED");
}


function compatibility()
{

    // different types
    const distance = math.unit(120, 'km');
    const temperature = math.unit(20, 'degC');
    const time = math.unit(60, 'minute');

    // here we are trying to add km and degC which
    // is meaningless and will throw an exception
    try
    {
        output(`math.add(distance, temperature): ${math.add(distance, temperature)}`);
    }
    catch (e)
    {
        output(`math.add(distance, temperature): ${e}`);
    }

    // dividing distance by time will give a result as km / minute
    output(`math.divide(distance, time): ${math.divide(distance, time)}`);
}


function astronomical()
{
    // create length units for astronomy
    math.createUnit('lightyear', '9460730777119.56 km');
    math.createUnit('parsec', '30856775714409.19 km');
    math.createUnit('AU', '149597870.7 km');

    // Proxima Centauri is the nearest star to the Sun
    const EarthToProximaCentauri = math.unit(4.2465, 'lightyear');
    output(`EarthToProximaCentauri: ${EarthToProximaCentauri}`);
    output(`EarthToProximaCentauri.to('km'): ${EarthToProximaCentauri.to('km')}`);
    output(`EarthToProximaCentauri.to('parsec'): ${EarthToProximaCentauri.to('parsec')}`);

    output("<br>");

    const EarthToSun = math.unit(1.0, 'AU');
    output(`EarthToSun: ${EarthToSun}`);
    output(`EarthToSun.to('miles'): ${EarthToSun.to('miles')}`);
    output(`EarthToSun.to('miles').toNumber(): ${EarthToSun.to('miles').toNumber()}`);
}


function gravity()
{
    // calculate the weight of a person on massMars

    // the values needed as math.unit objects
    const massPerson  = math.unit(75, 'kg');
    const massMars  = math.unit(6.4171e23, 'kg');
    const radiusMars = math.unit(3389500, 'm');

    // implement formula in 4 stages using math.js methods
    const numerator = math.multiply(massPerson, massMars);
    const denominator = math.pow(radiusMars, 2);
    const quotient = math.divide(numerator, denominator);
    const newtons = math.multiply(math.gravitationConstant, quotient);

    // convert Newtons to kg
    const weightOnMars = math.unit(math.divide(newtons.toNumber(), 9.80665), 'kg');

    output(`massPerson: ${massPerson}`);
    output(`massMars: ${massMars.to('kg')}`);
    output(`radiusMars: ${radiusMars.to('km')}`);
    output(`Newtons: ${newtons}`);
    output(`weightOnMars: ${weightOnMars.to('kg')}`);
}


function power()
{
    // demonstrate creating custom units
    // this is metric horsepower, most commonly denoted by PS
    // for pferd starke, German for horsepower
    math.createUnit('ps', '735.49875 watt');

    // The math.js hp is mechanical horsepower or approx 746 Watts
    const power  = math.unit(100, 'hp');

    output(`power: ${power}`);
    output(`power.to('kilowatt'): ${power.to('kilowatt')}`);
    output(`power.to('ps'): ${power.to('ps')}`);
}


function gallons()
{
    // create imperial gallon unit
    math.createUnit('impgal', '4.54609 liter');

    // could do this, but probably not advisable!
    // math.createUnit('gallon', '4.54609 liter', {override: true})

    const usgallon  = math.unit(1, 'gallon');
    output(`usgallon: ${usgallon}`);
    output(`usgallon.to('liter'): ${usgallon.to('liter')}`);

    output("<br>");

    const impgallon  = math.unit(1, 'impgal');
    output(`impgallon: ${impgallon}`);
    output(`impgallon.to('liter'): ${impgallon.to('liter')}`);
}


function bitsAndBytes()
{
    const bits  = math.unit(64, 'bits');
    const bytes = bits.to('bytes');
    const kilobytes = math.unit(1024, 'bytes');

    output(`bits: ${bits}`);
    output(`bytes: ${bytes}`);
    output(`kilobytes: ${kilobytes}`);
    output(`kilobytes to kibibytes: ${kilobytes.to('kibibytes')}`);
}
