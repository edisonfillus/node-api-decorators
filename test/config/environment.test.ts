import {config} from "../../src/config/environment";

describe('Config', () => {
    it('Should be in test environment',()=>{
        expect(process.env.NODE_ENV).toBe('test')
    })
    it('should have a port', () => {
        expect(config.port).toBeTruthy();
    });
    it('should have a jwt secret', () => {
        expect(config.jwtSecret).toBeTruthy();
    });
    it('should have a api prefix', () => {
        expect(config.api.prefix).toBeTruthy();
    });
    it('should have a log level', () => {
        expect(config.logs).toBeTruthy();
    });
});