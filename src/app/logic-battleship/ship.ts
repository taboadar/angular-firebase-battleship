import * as R from 'ramda';

export class Ship {
    private isHorizontal: boolean = false;
    private head: [number, number];
    private body: [number, number][];
    private length: number;

    constructor([x,y]: [number, number], length: number) {
        this.head = [x,y];
        this.body = this.setBody();
        this.length = length;
    }

    private setBody() {
        const [x,y] = this.head;
        return (this.isHorizontal ? 
            R.range(y, y+this.length).map<[number,number]>(nY => [x,nY]) :
            R.range(x, x+this.length).map<[number,number]>(nX => [nX,y]));
    }

    changeOrienation(bool: boolean) {
        this.isHorizontal = bool;
        this.body = this.setBody();
    }

    isValidOnMesh(width: number, height: number) {
        return R.all(([x,y]) => x < width && y < height)(this.body)
    }
    
    contains(cell: [number, number]) {
        return R.any(R.equals(cell), this.body);
    }

    isHitMe(cell: [number, number]) {
        return R.any(R.equals(cell), this.body);
    }

    intersectionWithShip(ship: Ship) {
        return R.any(cell => ship.contains(cell), this.body);
    }
}
