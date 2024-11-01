const query = require ("../services/QueryService")
const nguoidung = require ("../utils/constants/NguoiDungConstant")
const nguoiban = require ("../utils/constants/NguoiBanConstant")
class NguoiDung 
{
    async get ()
    {
        return await query.select ("*",nguoidung.tableName)
    }

    async getById (id)
    {
        return await query.select ("*",nguoidung.tableName,`where ${nguoidung.id} = ?`,[id])
    }
    
    async getByPassAndPhone (sdt,pass)
    {
        return await query.select ("*",nguoidung.tableName,`where ${nguoidung.mk} = ? and ${nguoidung.sdt} = ?`,[pass,sdt])
    }

    async add (obj)
    {
        return await query.insert (nguoidung.tableName,obj,nguoidung.id)
    }

    async update (obj)
    {
        return await query.update (nguoidung.tableName,obj,`where ${nguoidung.id} = ?`, [obj[nguoidung.id]], nguoidung.id)   
    }
    
    async remove (obj)
    {
        return await query.remove (nguoidung.tableName,`where ${nguoidung.id} = ?`,[obj[nguoidung.id]])
    }

    async search (keyword)
    {
        // Tạo bảng phụ
        let subTable = `(select distinct nguoiban.MaNguoiBan from nguoiban left join loainguoiban_nguoiban on loainguoiban_nguoiban.MaNguoiBan = nguoiban.MaNguoiBan left join loainguoiban on loainguoiban_nguoiban.MaLoaiNguoiBan = loainguoiban.MaLoaiNguoiBan left join loaimonan on loaimonan.MaNguoiBan = nguoiban.MaNguoiBan join monan on monan.MaNguoiBan = nguoiban.MaNguoiBan where nguoiban.TenNguoiBan like ? or loainguoiban.TenLoaiNguoiBan like ? or loaimonan.TenLoaiMonAn like ? or monan.TenMonAn like ?) as tmp`
        let newKeyword = keyword+"%"
        let args = Array(4).fill (newKeyword)
        let joinClause = `join ${subTable} on ${nguoiban.tableName}.${nguoiban.id} = tmp.MaNguoiBan`
        return await query.selectWithJoin ("*",nguoiban.tableName,joinClause,undefined,args)
    }
}


module.exports = new NguoiDung