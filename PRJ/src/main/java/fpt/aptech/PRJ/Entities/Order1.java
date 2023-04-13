/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fpt.aptech.PRJ.Entities;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author ruava
 */
@Entity
@Table(name = "order")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Order1.findAll", query = "SELECT o FROM Order1 o"),
    @NamedQuery(name = "Order1.findById", query = "SELECT o FROM Order1 o WHERE o.id = :id"),
    @NamedQuery(name = "Order1.findByDateorder", query = "SELECT o FROM Order1 o WHERE o.dateorder = :dateorder"),
    @NamedQuery(name = "Order1.findByDateship", query = "SELECT o FROM Order1 o WHERE o.dateship = :dateship"),
    @NamedQuery(name = "Order1.findByIscancel", query = "SELECT o FROM Order1 o WHERE o.iscancel = :iscancel"),
    @NamedQuery(name = "Order1.findByIsapproved", query = "SELECT o FROM Order1 o WHERE o.isapproved = :isapproved"),
    @NamedQuery(name = "Order1.findByTotal", query = "SELECT o FROM Order1 o WHERE o.total = :total"),
    @NamedQuery(name = "Order1.findByPaypal", query = "SELECT o FROM Order1 o WHERE o.paypal = :paypal"),
    @NamedQuery(name = "Order1.findByCod", query = "SELECT o FROM Order1 o WHERE o.cod = :cod")})
public class Order1 implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Column(name = "dateorder")
    private String dateorder;
    @Column(name = "dateship")
    private String dateship;
    @Column(name = "iscancel")
    private Boolean iscancel;
    @Column(name = "isapproved")
    private Boolean isapproved;
    @Column(name = "total")
    private Integer total;
    @Column(name = "paypal")
    private Boolean paypal;
    @Column(name = "cod")
    private Boolean cod;
    @JoinColumn(name = "memberid", referencedColumnName = "id")
    @ManyToOne
    private Member1 memberid;
    @OneToMany(mappedBy = "orderid")
    private List<Orderdetail> orderdetailList;

    public Order1() {
    }

    public Order1(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDateorder() {
        return dateorder;
    }

    public void setDateorder(String dateorder) {
        this.dateorder = dateorder;
    }

    public String getDateship() {
        return dateship;
    }

    public void setDateship(String dateship) {
        this.dateship = dateship;
    }

    public Boolean getIscancel() {
        return iscancel;
    }

    public void setIscancel(Boolean iscancel) {
        this.iscancel = iscancel;
    }

    public Boolean getIsapproved() {
        return isapproved;
    }

    public void setIsapproved(Boolean isapproved) {
        this.isapproved = isapproved;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Boolean getPaypal() {
        return paypal;
    }

    public void setPaypal(Boolean paypal) {
        this.paypal = paypal;
    }

    public Boolean getCod() {
        return cod;
    }

    public void setCod(Boolean cod) {
        this.cod = cod;
    }

    public Member1 getMemberid() {
        return memberid;
    }

    public void setMemberid(Member1 memberid) {
        this.memberid = memberid;
    }

    @XmlTransient
    public List<Orderdetail> getOrderdetailList() {
        return orderdetailList;
    }

    public void setOrderdetailList(List<Orderdetail> orderdetailList) {
        this.orderdetailList = orderdetailList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Order1)) {
            return false;
        }
        Order1 other = (Order1) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.PRJ.Entities.Order1[ id=" + id + " ]";
    }
    
}
