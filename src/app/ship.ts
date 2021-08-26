import * as R from 'ramda';

export class Ship {
    name: string;
    length: number;
    private body: [number,number][] = [];
    constructor(name: string, lenght: number) {
        this.name = name;
        this.length = lenght;
    }

    getBody() {
        return this.body
    }
    
    head() {
        return R.head(this.body)
    }

    setBody(x: number, y: number, isVertical: boolean) {
        if(isVertical) {
            this.body = R.zip(R.times(R.always(x),this.length), R.range(y, y+this.length))
        } else {
            this.body = R.zip(R.range(x, x+ this.length), R.times(R.always(y), this.length))
        }
    }

    containCell(x: number, y: number) {
        return R.any(R.equals([x,y]), this.body);
    }
    
    containShip(s: Ship) {
        const assertions = R.map(([x,y]) => this.containCell(x,y), s.getBody());
        return assertions.reduce(R.or, false);
    }

    isValidOnMesh(maxX:number = 5, maxY:number = 5) {
        return R.all(([x,y]) => (
            x >= 0 
            && y >= 0 
            && x < maxX 
            && y < maxY), this.body)
    }

    toJSON() {
        return {
            name: this.name,
            body: this.body.map(R.join(','))
        }
    }

    static fromJSON(json: any): Ship {
        let { name, body} = json;
        body = body.map((tuple: any) => R.split(',', tuple).map(x => Number.parseInt(x)))
        const ship = new Ship(name, body.lenght);
        ship.body = body;
        ship.length = body.length;
        return ship;
    }
}
