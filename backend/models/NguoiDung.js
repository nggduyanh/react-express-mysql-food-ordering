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

    async getByPhone (sdt)
    {
        return await query.select ("*",nguoidung.tableName,`where ${nguoidung.sdt} = ?`,[sdt])
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
        let subTable = `(select distinct NguoiBan.MaNguoiBan from NguoiBan left join LoaiNguoiBan_NguoiBan on LoaiNguoiBan_NguoiBan.MaNguoiBan = NguoiBan.MaNguoiBan left join LoaiNguoiBan on LoaiNguoiBan_NguoiBan.MaLoaiNguoiBan = LoaiNguoiBan.MaLoaiNguoiBan left join LoaiMonAn on LoaiMonAn.MaNguoiBan = NguoiBan.MaNguoiBan join MonAn on MonAn.MaNguoiBan = NguoiBan.MaNguoiBan where NguoiBan.TenNguoiBan like ? or LoaiNguoiBan.TenLoaiNguoiBan like ? or LoaiMonAn.TenLoaiMonAn like ? or MonAn.TenMonAn like ?) as tmp`
        let newKeyword = keyword+"%"
        let args = Array(4).fill (newKeyword)
        let joinClause = `join ${subTable} on ${nguoiban.tableName}.${nguoiban.id} = tmp.MaNguoiBan`
        return await query.selectWithJoin ("*",nguoiban.tableName,joinClause,undefined,args)
    }
}


module.exports = new NguoiDung